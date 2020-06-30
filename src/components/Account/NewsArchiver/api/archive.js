export const archiveArticle = ([db, title, url, comment]) => {
   db.add({
      title: title,
      url: url,
      comment: comment
   });
};

export const updateArticleComment = (db, docId, comment) => {
   db.doc(docId).update({
      comment: comment
   });
};

export const deleteArticle = (db, docId) => {
   db.doc(docId).delete();
};

export const getArticles = db => {
   const result = db.get();
   return result;
};
