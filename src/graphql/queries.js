// eslint-disable
// this is an auto generated file. This will be overwritten

export const getBlog = `query GetBlog($id: ID!) {
  getBlog(id: $id) {
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
export const listBlogs = `query ListBlogs(
  $filter: ModelBlogFilterInput
  $limit: Int
  $nextToken: String
) {
  listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      posts {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getCard = `query GetCard($id: ID!) {
  getCard(id: $id) {
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
export const listCards = `query ListCards(
  $filter: ModelCardFilterInput
  $limit: Int
  $nextToken: String
) {
  listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      posts {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
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
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
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
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      post {
        id
        title
        intensity
      }
    }
    nextToken
  }
}
`;
export const getEmotion = `query GetEmotion($id: ID!) {
  getEmotion(id: $id) {
    id
    name
    intensity
    lastUpdated
  }
}
`;
export const listEmotions = `query ListEmotions(
  $filter: ModelEmotionFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmotions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      intensity
      lastUpdated
    }
    nextToken
  }
}
`;
