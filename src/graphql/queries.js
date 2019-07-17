// eslint-disable
// this is an auto generated file. This will be overwritten

export const emotionsForCard = `query EmotionsForCard($cardId: ID!, $limit: Int, $nextToken: String) {
  emotionsForCard(cardId: $cardId, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
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
      emotions {
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
      parent {
        id
        name
        intensity
        lastUpdated
      }
    }
    nextToken
  }
}
`;
