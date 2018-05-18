'use strict';

/* global localStore, $, localStore, api */

const dom = (function() {

	const showAddNewForm = function() {
		$('.toggleForm').on('click', () => {
			// console.log('i ran');
			//append html to page
			//$('.addNew').html(addNewForm);
			localStore.toggleAdding();
			$('.addNew').html(addNewForm);
			hideFormButton();
			render();
		});
	};

	const hideFormButton = function() {
		localStore.adding ? $('.toggleForm').text('Close') : $('.toggleForm').text('Add');
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
			const desc = $(event.currentTarget).find('.newDescription').val();
			const rating = parseInt($(event.currentTarget).find('.newRating').find(':selected').text()[0]);

			const newBookmark = {
				title,
				url,
				desc,
				rating,
				showDetailed: false
			};

			api.createBookmark(newBookmark, bookmark => {
				localStore.addNewBookmark(bookmark);
				localStore.toggleAdding();
				render();
			}, error => {
				$('.addNew').append('<p>Title and URL are required! Also, make sure your URL is prefixed by http(s)://</p>');
			});

		});
	};


	const getIdFromElement = function(article) {
		return ($(article).closest('.article')).attr('articleid');
	};

	const deleteBookmarkFromDom = function() {
		$('.bookmarkList').on('click', '.deleteArticle', event => {
			const currentElementId = getIdFromElement(event.currentTarget);
			
			api.deleteBookmark(currentElementId, () => {
				localStore.deleteBookmark(currentElementId);
				render();
			});
		});

	};

	const showDescription = function() {
		$('.bookmarkList').on('click', '.toggleDescription', event => {
			const articleId = getIdFromElement(event.currentTarget);
			localStore.toggleShowDetailed(articleId);
			render();
		});
	};

	const toggleDescriptionHtml = function(singleBookmarkObj) {
		console.log(singleBookmarkObj);
		return singleBookmarkObj.showDetailed ? `
			<p>${singleBookmarkObj.desc}</p>
			<a href="${singleBookmarkObj.url}"><button class="visit">Visit Site</button></a>
		` : '';
	};

	const filterByRating = function() {
		$('.filterByRating').on('change', event => {
			const value = $(event.currentTarget).val();
			const filtered = localStore.searchByRating(value);
			render(filtered);
			// localStore.toggleShowRating();

			// const singleRating = localStore.searchByRating();
			// render(singleRating);
		});
	};


	const generateBookmarkHtml = function(singleBookmarkObj) {
		return `
			<li class="article" articleid="${singleBookmarkObj.id}">
				<h3>${singleBookmarkObj.title}</h3>
				
				${toggleDescriptionHtml(singleBookmarkObj)}
				<button class="toggleDescription">Show More</button>
				<button class="deleteArticle">Delete</button>
				<p class="rating">${singleBookmarkObj.rating}</p>
		</li>
		`;
	};

	const generateAllBookmarksHtml = function(articles) {
		return articles.map(each => generateBookmarkHtml(each)).join('');
	};


	const render = function(articles = localStore.localBookmarks) {
		$('.bookmarkList').html(generateAllBookmarksHtml(articles));
	};

	const bindEventListeners = function() {
		showAddNewForm();
		capturingNewBookmarkInfo();
		deleteBookmarkFromDom();
		showDescription();
		filterByRating();
	};

	return {
		render,
		bindEventListeners
	};

}());


