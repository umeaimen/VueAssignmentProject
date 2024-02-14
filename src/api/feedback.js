import axios from 'axios';
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export const feedbackErrors = ref({})

export const clearFeedbackErrors = () => {
  Object.keys(feedbackErrors.value).forEach(key => {
    feedbackErrors.value[key] = [];
  });
};

export const handleFileUpload = (event, feedback) => {
  const files = event.target.files;
  console.log('before',feedback);
  if (files.length > 0) {
    feedback.attachment = files[0];
  }
  console.log('after',feedback);
};
export const submitFeedback = async (feedbackData) => {
  try {
    console.log('submit req',feedbackData)
    const bearToken = JSON.parse(localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${bearToken.token}`;
    const response = await axios.post('/api/feedback', feedbackData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    clearFeedbackErrors();
    toast('Feedback Created Successfully', {
      autoClose: 1000,
    });
  } catch (error) {
    if (error.response.status === 422) {
      feedbackErrors.value = error.response.data.errors;
    }else{
      toast(e.response.data.message, {
        autoClose: 1000
      })
    }
  }
};
export const feedbackData = ref([]);
export const fields = ref(['id', 'title', 'description', 'category', 'created_at']);

export const fetchFeedbackData = async () => {
  try {
    const bearToken = JSON.parse(localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${bearToken.token}`;
    const response = await axios.get('api/user/feedback');
    feedbackData.value = response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
  }
};

export async function getFeedbackById(feedbackId) {
  try {
    const bearToken = JSON.parse(localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${bearToken.token}`;
    const response = await axios.get(`/api/feedback/${feedbackId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching feedback by ID:', error);
    throw error; 
  }
}

export async function updateFeedback(feedbackData) {
  try {
    const bearToken = JSON.parse(localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${bearToken.token}`;

    // Upload the attachment
    const formData = new FormData();
    formData.append('attachment', feedbackData.attachment);    

    const uploadResponse = await axios.post('/api/feedback/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    feedbackData.attachment = uploadResponse.data.path;

    // Update the feedback with the new attachment path
    const updateResponse = await axios.put(`/api/feedback/${feedbackData.id}`, feedbackData);

    clearFeedbackErrors();
    toast('Feedback Updated Successfully', {
      autoClose: 1000,
    });
  } catch (error) {
    if (error.response && error.response.status === 422) {
      feedbackErrors.value = error.response.data.errors;
    } else {
      toast(error.response.data.message, {
        autoClose: 1000
      });
    }
  }
}


export default function useAuth() {
  return {
    fetchFeedbackData,
    submitFeedback,
    handleFileUpload
  }
}