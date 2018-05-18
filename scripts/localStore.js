'use strict';

/* global api */

const localStore = (function() {


	const addNewBookmark = function(bookmark) {
		this.localBookmarks.push(bookmark);
	};

	const deleteBookmark = function(id) {
		this.localBookmarks = this.localBookmarks.filter(each => each.id !== id);
	};

	const updateBookmark = function() {
		// this.localBookmarks
	};

	const searchByRating = function() {

	};

	const findById = function(id) {
		return this.localBookmarks.find(each => each.id === id);
	};

	const toggleAdding = function() {
		this.adding = !this.adding;
	};

	const toggleShowDetailed = function(id) {
		(this.findById(id)).showDetailed = !(this.findById(id)).showDetailed;
	};

	return {
		localBookmarks: [],
		showRating: false,
		adding: false,

		addNewBookmark,
		deleteBookmark,
		updateBookmark,
		searchByRating,
		findById,
		toggleAdding,
		toggleShowDetailed
	};
}());