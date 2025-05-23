import base_url from "./base_url";
import commonApi from "./commonApis";

export const registrationApi = async (data) => {
  return await commonApi(`${base_url}/userreg`, 'POST', '', data)
}

export const loginApi = async (data) => {
  return await commonApi(`${base_url}/userlogin`, 'POST', '', data)
}

export const adminLoginApi = async (data) => {
  return await commonApi(`${base_url}/admin/login`, 'POST', '', data)
}

export const addBlogApi = async (data) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${base_url}/user/addblog`, 'POST', headers, data)
}

export const getBlogsApi = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${base_url}/user/getblogs`, 'GET', headers, '')

}

export const deleteBlogApi = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${base_url}/user/deleteblog/${id}`, 'DELETE', headers, {})
}

export const UpdateBlog = async (id, data) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${base_url}/user/updateblog/${id}`, 'PUT', headers, data)
}

export const getBlogpgApi = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${base_url}/user/getblogpg/${id}`, 'GET', headers, '')
}

export const likeBlogApi = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${base_url}/user/bloglike/${id}`, 'PUT', headers, {})
}

export const shareBlogApi = async (id, url) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${base_url}/user/getblogpg/${id}/shares`, 'POST', headers, { url })
}

export const getSharesApi = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${base_url}/user/getblogpg/${id}/shares`, 'GET', headers, {}
  )
}

export const reportBlogApi = async (id, data) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/user/getblogpg/${id}/report`, 'POST', headers, data);
};

export const checkReportedApi = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/user/getblogpg/${id}/checkreport`, 'GET', headers, {});
};

export const getAllBlogApi = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/user/getallblogs`, 'GET', headers, {})
}

export const getNotificationsApi = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/user/notifications`, 'GET', headers, '');
};

export const markNotificationReadApi = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/user/notifications/${id}/read`, 'PUT', headers, {});
};

export const approveBlogApi = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/approve/${id}`, 'PUT', headers, {});
};

export const rejectBlogApi = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/reject/${id}`, 'DELETE', headers, {});
};

export const getAllBlogsForAdminApi = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/blogs`, 'GET', headers, {});
};

export const getAllUsersForAdmin = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/alluser`, 'GET', headers, {});
};

export const getTotalLikesForAdmin = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/totallikes`, 'GET', headers, {});
};

export const getReportedBlogsForAdmin = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/reportedblogs`, 'GET', headers, {});
};

export const getReportedCountForAdmin = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/reportcount`, 'GET', headers, {});
};

export const getCategoryBreakdownForAdmin = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/category-breakdown`, 'GET', headers, {});
};

export const getTrendingTopicForAdmin = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/trending-categories`, 'GET', headers, {});
};

// export const getProfile = async (id) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Token ${sessionStorage.getItem('token')}`
//   };
//   return await commonApi(`${base_url}/user/profile/${id}`, 'GET', headers, {});
// };

export const UpdateProfile = async (data) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/user/editprofile`, 'PUT', headers, data);
};

export const getUserBlogSummary = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/user/blog-summary/${id}`, 'GET', headers, {});
};

export const ContactApi = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/contact`, 'POST', headers, data);
};

export const getMessageApi = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${sessionStorage.getItem('token')}`
  };
  return await commonApi(`${base_url}/admin/getmessage`, 'GET', headers, {});
};



// export const incrementViewsApi = async (id) => {
//     const headers = {
//         'Authorization': `Token ${sessionStorage.getItem('token')}`
//     };
//     return await commonApi(`${base_url}/user/blogpg/${id}/view`, 'POST', headers, {});
// };




// export const addCommentApi=async(id,data)=>{
//     const headers={
//         'Content-Type':'application/json',
//         'Authorization':`Token ${sessionStorage.getItem('token')}`
//     }
//     return await commonApi(`${base_url}/user/getblogpg/${id}/comment`,'POST',headers,data)
// }

// export const getCommentApi=async(id)=>{
//     const headers={
//         'Content-Type':'application/json',
//         'Authorization':`Token ${sessionStorage.getItem('token')}`
//     }
//     return await commonApi(`${base_url}/user/getblogpg/${id}/getcmnt`,'GET',headers,{})
// }
// export const addRplyCommentApi=async(id,data)=>{
//     const headers={
//         'Content-Type':'application/json',
//         'Authorization':`Token ${sessionStorage.getItem('token')}`
//     }
//     return await commonApi(`${base_url}/user/getblogpg/${id}/rplycomment`,'POST',headers,data)
// }
// export const getRplyCommentApi=async(id)=>{
//     const headers={
//         'Content-Type':'application/json',
//         'Authorization':`Token ${sessionStorage.getItem('token')}`
//     }
//     return await commonApi(`${base_url}/user//getblogpg/${id}/getrplycomment`,'GET',headers,{})
// }

// export const editCommentApi=async(id,commentId)=>{
//     const headers={
//         'Content-Type':'application/json',
//         'Authorization':`Token ${sessionStorage.getItem('token')}`
//     }
//     return await commonApi(`${base_url}/user/blogpg/${id}/editcomment/${commentId}`,'PUT',headers,{})
// }

// export const deleteCommentApi=async(id,commentId)=>{
//     const headers={
//         'Content-Type':'application/json',
//         'Authorization':`Token ${sessionStorage.getItem('token')}`
//     }
//     return await commonApi(`${base_url}/user/blogpg/${id}/deletecomment/${commentId}`,'DELETE',headers,{})
// }


