'use strict';

/* global $, api, localStore, dom */

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
//   //console.log(localStore.findById('cjhau53sg002l0ky1zyynq3x6'));
//   localStore.deleteBookmark('cjhau53sg002l0ky1zyynq3x6');
//   console.log(localStore.localBookmarks);
// });

// api.updateBookmark('cjhau3ayr002k0ky1v74cuext', {title: 'cats'}, () => {
// 	api.fetchAllBookmarks(function(data) {
// 	  console.log(data);
// 	});
// });

// api.deleteBookmark('cjhau3ayr002k0ky1v74cuext', () => {
// 	api.fetchAllBookmarks(function(data) {
// 	  console.log(data);
// 	});
// });




// const html = `
// 	<li class="article" articleId="id">
// 		<h3>Fluffiest Cats in the World</h3>
// 		<p>pawesome.com</p>
// 		<button class="description">Show More</button>
// 		<button class="deleteArticle">Delete</button>
// 		<p class="rating">3 Star</p>
// 	</li>
// `;

// console.log(dom.getIdFromElement(html));

$(document).ready(function() {
	api.fetchAllBookmarks(bookmarksResponse => {
		bookmarksResponse.forEach(bookmark => localStore.addNewBookmark(bookmark));
		dom.render();
	});
	dom.bindEventListeners();
	
	// console.log(localStore.findById('cjhcbl6o5003p0kvuru2td9e7'));
});





