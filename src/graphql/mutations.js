// eslint-disable
// this is an auto generated file. This will be overwritten

export const createBlog = `mutation CreateBlog($input: CreateBlogInput!) {
  createBlog(input: $input) {
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
export const updateBlog = `mutation UpdateBlog($input: UpdateBlogInput!) {
  updateBlog(input: $input) {
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
export const deleteBlog = `mutation DeleteBlog($input: DeleteBlogInput!) {
  deleteBlog(input: $input) {
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
export const createCard = `mutation CreateCard($input: CreateCardInput!) {
  createCard(input: $input) {
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
    emotions {
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
export const updateCard = `mutation UpdateCard($input: UpdateCardInput!) {
  updateCard(input: $input) {
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
    emotions {
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
export const deleteCard = `mutation DeleteCard($input: DeleteCardInput!) {
  deleteCard(input: $input) {
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
    emotions {
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
export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    card {
      id
      name
      createdAt
      posts {
        nextToken
      }
      emotions {
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
    parent {
      id
      title
      blog {
        id
        name
      }
      card {
        id
        name
        createdAt
      }
      comments {
        nextToken
      }
      intensity
      parent {
        id
        title
        intensity
      }
    }
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    card {
      id
      name
      createdAt
      posts {
        nextToken
      }
      emotions {
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
    parent {
      id
      title
      blog {
        id
        name
      }
      card {
        id
        name
        createdAt
      }
      comments {
        nextToken
      }
      intensity
      parent {
        id
        title
        intensity
      }
    }
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    card {
      id
      name
      createdAt
      posts {
        nextToken
      }
      emotions {
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
    parent {
      id
      title
      blog {
        id
        name
      }
      card {
        id
        name
        createdAt
      }
      comments {
        nextToken
      }
      intensity
      parent {
        id
        title
        intensity
      }
    }
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      card {
        id
        name
        createdAt
      }
      comments {
        nextToken
      }
      intensity
      parent {
        id
        title
        intensity
      }
    }
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      card {
        id
        name
        createdAt
      }
      comments {
        nextToken
      }
      intensity
      parent {
        id
        title
        intensity
      }
    }
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      card {
        id
        name
        createdAt
      }
      comments {
        nextToken
      }
      intensity
      parent {
        id
        title
        intensity
      }
    }
  }
}
`;
export const createEmotion = `mutation CreateEmotion($input: CreateEmotionInput!) {
  createEmotion(input: $input) {
    id
    name
    intensity
    lastUpdated
    parent {
      id
      name
      intensity
      lastUpdated
      parent {
        id
        name
        intensity
        lastUpdated
      }
    }
  }
}
`;
export const updateEmotion = `mutation UpdateEmotion($input: UpdateEmotionInput!) {
  updateEmotion(input: $input) {
    id
    name
    intensity
    lastUpdated
    parent {
      id
      name
      intensity
      lastUpdated
      parent {
        id
        name
        intensity
        lastUpdated
      }
    }
  }
}
`;
export const deleteEmotion = `mutation DeleteEmotion($input: DeleteEmotionInput!) {
  deleteEmotion(input: $input) {
    id
    name
    intensity
    lastUpdated
    parent {
      id
      name
      intensity
      lastUpdated
      parent {
        id
        name
        intensity
        lastUpdated
      }
    }
  }
}
`;
