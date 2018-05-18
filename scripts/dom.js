'use strict';

/* global localStore, $, store, */

const dom = (function() {

	const showAddNewForm = function() {
		$('.toggleForm').on('click', () => {
			// console.log('i ran');
			//append html to page
			//$('.addNew').html(addNewForm);
			localStore.toggleAdding();
			$('.addNew').html(addNewForm);
			hideButton();
			render();
		});
	};

	const addNewForm = function() {
		return localStore.adding ? `
			<label for="title">Title</label>
			<input type="text" name="title" class="newTitle"/>
			<label for="url">URL</label>
			<input type="text" name="url" class="newUrl"/>
			<label for="description">Description</label>
			<input type="text" name="description" class="newDescription">
			<select class="newRating">
				<option value="fiveStar">5 Star</option>
				<option value="fourStar">4 Star</option>
				<option value="threeStar">3 Star</option>
				<option value="twoStar">2 Star</option>
				<option value="oneStar">1 Star</option>
			</select>
			<input type="submit" value="Submit"/>
		` : '';
	};

	const capturingNewBookmarkInfo = function() {
		$('.addNew').submit(event => {
			// console.log('.addNew');
			event.preventDefault();
			const title = $(event.currentTarget).find('.newTitle').val();
			const url = $(event.currentTarget).find('.newUrl').val();
			const description = $(event.currentTarget).find('.newDescription').val();
			const rating = parseInt($(event.currentTarget).find('.newRating').find(':selected').text()[0]);

			const newBookmark = {
				title,
				url,
				description,
				rating
			};

			api.createBookmark(newBookmark, bookmark => {
				localStore.addNewBookmark(bookmark);
				localStore.toggleAdding();
				render();
			});

		});
	};


	const hideButton = function() {
		localStore.adding ? $('.toggleForm').text('Close') : $('.toggleForm').text('Add');
	};

	const getIdFromElement = function(article) {
		return (article).closest('.article').data('articleId');
	};

	const deleteBookmarkFromDom = function() {
		$('.bookmarkList').on('click', '.deleteArticle', event => {
			// const currentElementId = getIdFromElement(event.currentTarget);
			console.log((event.currentTarget).closest('.article').data("articleId"));
		});

	};

	const generateBookmarkHtml = function(singleBookmarkObj) {
		return `
			<li class="article" articleId="${singleBookmarkObj.id}">
				<h3>${singleBookmarkObj.title}</h3>
				<p>${singleBookmarkObj.url}</p>
				<button class="description">Show More</button>
				<button class="deleteArticle">Delete</button>
				<p class="rating">${singleBookmarkObj.rating}</p>
		</li>
		`;
	};

	const generateAllBookmarksHtml = function(articles) {
		return articles.map(each => generateBookmarkHtml(each)).join('');
	};

	const showDescription = function() {

	};

	const render = function() {
		// console.log('i ran');
		let articles = localStore.localBookmarks;

		// $('.addNew').html(addNewForm());
		$('.bookmarkList').html(generateAllBookmarksHtml(articles));
	};

	const bindEventListeners = function() {
		showAddNewForm();
		capturingNewBookmarkInfo();
		deleteBookmarkFromDom();
	};

	return {
		render,
		bindEventListeners
	};
}());


