'use strict';

/* global $, api*/

// api.fetchAllBookmarks(function(data) {
//   console.log(data);
// });

// api.createBookmark('cats', 'https://google.com', (newItem) => {
//   api.fetchAllBookmarks((items) => {
//     console.log(items);
//   });
// });

// api.fetchAllBookmarks((items) => {
//   items.forEach((item) => localStore.addNewBookmark(item));
//   console.log(localStore.localBookmarks);
// });

// api.updateBookmark('cjhau3ayr002k0ky1v74cuext', {title: 'cats'}, () => {
// 	api.fetchAllBookmarks(function(data) {
// 	  console.log(data);
// 	});
// });

api.deleteBookmark('cjhau3ayr002k0ky1v74cuext', () => {
	api.fetchAllBookmarks(function(data) {
	  console.log(data);
	});
});