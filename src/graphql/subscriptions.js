// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateBlog = `subscription OnCreateBlog {
  onCreateBlog {
    id
    name
    posts {
      items {
        id
        title
        intensity
      }
      nextToken
    }
  }
}
`;
export const onUpdateBlog = `subscription OnUpdateBlog {
  onUpdateBlog {
    id
    name
    posts {
      items {
        id
        title
        intensity
      }
      nextToken
    }
  }
}
`;
export const onDeleteBlog = `subscription OnDeleteBlog {
  onDeleteBlog {
    id
    name
    posts {
      items {
        id
        title
        intensity
      }
      nextToken
    }
  }
}
`;
export const onCreateCard = `subscription OnCreateCard {
  onCreateCard {
    id
    name
    createdAt
    posts {
      items {
        id
        title
        intensity
      }
      nextToken
    }
  }
}
`;
export const onUpdateCard = `subscription OnUpdateCard {
  onUpdateCard {
    id
    name
    createdAt
    posts {
      items {
        id
        title
        intensity
      }
      nextToken
    }
  }
}
`;
export const onDeleteCard = `subscription OnDeleteCard {
  onDeleteCard {
    id
    name
    createdAt
    posts {
      items {
        id
        title
        intensity
      }
      nextToken
    }
  }
}
`;
export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    comments {
      items {
        id
        content
      }
      nextToken
    }
    intensity
  }
}
`;
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    comments {
      items {
        id
        content
      }
      nextToken
    }
    intensity
  }
}
`;
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    comments {
      items {
        id
        content
      }
      nextToken
    }
    intensity
  }
}
`;
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      comments {
        nextToken
      }
      intensity
    }
  }
}
`;
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      comments {
        nextToken
      }
      intensity
    }
  }
}
`;
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      comments {
        nextToken
      }
      intensity
    }
  }
}
`;
export const onCreateEmotion = `subscription OnCreateEmotion {
  onCreateEmotion {
    id
    name
    intensity
    lastUpdated
  }
}
`;
export const onUpdateEmotion = `subscription OnUpdateEmotion {
  onUpdateEmotion {
    id
    name
    intensity
    lastUpdated
  }
}
`;
export const onDeleteEmotion = `subscription OnDeleteEmotion {
  onDeleteEmotion {
    id
    name
    intensity
    lastUpdated
  }
}
`;
