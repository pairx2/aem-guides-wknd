(function($, ns, channel, window) {
	"use strict";

	const NS = ".cmp-childreneditor";
	const NN_PREFIX = "item_";
	const PN_TITLE = "jcr:title";
	const PN_RESOURCE_TYPE = "sling:resourceType";
	const POST_SUFFIX = ".container.html";

	const selectors = {
		self: "[data-cmp-is='childrenEditor']",
		add: "[data-cmp-hook-childreneditor='add']",
		insertComponentDialog: {
			self: "coral-dialog.InsertComponentDialog",
			selectList: "coral-selectlist"
		},
		item: {
			icon: "[data-cmp-hook-childreneditor='itemIcon']",
			input: "[data-cmp-hook-childreneditor='itemTitle']",
			hiddenInput: "[data-cmp-hook-childreneditor='itemResourceType']"
		}
	};

	/**
	 * @typedef {Object} ChildrenEditorConfig Represents a Children Editor configuration object
	 * @property {HTMLElement} el The HTMLElement representing this Children Editor
	 */

	/**
	 * Children Editor
	 *
	 * @class ChildrenEditor
	 * @classdesc A Children Editor is a dialog component based on a multifield that allows editing (adding, removing, renaming, re-ordering)
	 * the child items of panel container components.
	 * @param {ChildrenEditorConfig} config The Children Editor configuration object
	 */
	let ChildrenEditor = function(config) {
		this._config = config;
		this._elements = {};
		this._path = "";
		this._orderedChildren = [];
		this._deletedChildren = [];
		this._init();

		let that = this;
		$(window).adaptTo("foundation-registry").register("foundation.adapters", {
			type: "cmp-childreneditor",
			selector: selectors.self,
			adapter: function() {
				return {
					items: function() {
						let items = [];
						that._elements.self.items.getAll().forEach(function(item) {
							let component = item.querySelector(selectors.item.icon + " [title]").getAttribute("title");
							let title = item.querySelector(selectors.item.input);
							let name = (title && title.name) ? title.name.match(".?/?(.+)/.*")[1] : "";
							let description = component + ((title && title.value) ? ": " + title.value : "");
							items.push({
								name: name,
								description: description
							});
						});
						return items;
					}
				};
			}
		});
	};

	ChildrenEditor.prototype = (function() {

		return {

			constructor: ChildrenEditor,

			/**
			 * Persists item updates to an endpoint, returns a Promise for handling
			 *
			 * @returns {Promise} The promise for completion handling
			 */
			update: function() {
				let url = this._path + POST_SUFFIX;

				this._processChildren();

				return $.ajax({
					type: "POST",
					url: url,
					async: false,
					data: {
						"delete": this._deletedChildren,
						"order": this._orderedChildren
					}
				});
			},

			/**
			 * Initializes the Children Editor
			 *
			 * @private
			 */
			_init: function() {
				this._elements.self = this._config.el;
				this._elements.add = this._elements.self.querySelectorAll(selectors.add)[0];
				this._path = this._elements.self.dataset["containerPath"];

				// store a reference to the Children Editor object
				$(this._elements.self).data("childrenEditor", this);

				this._bindEvents();
				this._toggleAddButton();
			},

			/**
			 * Renders a component icon
			 *
			 * @private
			 * @param {Granite.author.Component} component The component to render the icon for
			 * @returns {HTMLElement} The rendered icon
			 */
			_renderIcon: function(component) {
				let iconHTML;
				let iconName = component.componentConfig.iconName;
				let iconPath = component.componentConfig.iconPath;
				let abbreviation = component.componentConfig.abbreviation;

				if (iconName) {
					iconHTML = new Coral.Icon().set({
						icon: iconName
					});
				} else if (iconPath) {
					iconHTML = document.createElement("img");
					iconHTML.src = iconPath;
				} else {
					iconHTML = new Coral.Tag().set({
						color: "grey",
						size: "M",
						label: {
							textContent: abbreviation
						}
					});
					iconHTML.classList.add("cmp-childreneditor__item-tag");
				}

				iconHTML.title = component.getTitle();

				return iconHTML;
			},

			/**
			 * Binds Children Editor events
			 *
			 * @private
			 */
			_bindEvents: function() {
				let that = this;

				if (ns) {
					Coral.commons.ready(that._elements.add, function() {
						that._elements.add.on("click", function() {
							let editable = ns.editables.find(that._path)[0];
							let children = editable.getChildren();

							// create the insert component dialog relative to a child item
							// - against which allowed components are calculated.
							if (children.length > 0) {
								// display the insert component dialog
								ns.edit.ToolbarActions.INSERT.execute(children[0]);

								let insertComponentDialog = $(document).find(selectors.insertComponentDialog.self)[0];
								let selectList = insertComponentDialog.querySelectorAll(selectors.insertComponentDialog.selectList)[0];

								// next frame to ensure we remove the default event handler
								Coral.commons.nextFrame(function() {
									selectList.off("coral-selectlist:change");
									selectList.on("coral-selectlist:change" + NS, function(event) {
										let resourceType = "";
										let componentTitle = "";

										insertComponentDialog.hide();

										let components = ns.components.find(event.detail.selection.value);
										if (components.length > 0) {
											resourceType = components[0].getResourceType();
											componentTitle = components[0].getTitle();

											let item = that._elements.self.items.add(new Coral.Multifield.Item());

											// next frame to ensure the item template is rendered in the DOM
											Coral.commons.nextFrame(function() {
												let name = NN_PREFIX + Date.now();
												item.dataset["name"] = name;

												let input = item.querySelectorAll(selectors.item.input)[0];
												input.name = "./" + name + "/" + PN_TITLE;
												input.placeholder = Granite.I18n.get(componentTitle);

												let hiddenInput = item.querySelectorAll(selectors.item.hiddenInput)[0];
												hiddenInput.value = resourceType;
												hiddenInput.name = "./" + name + "/" + PN_RESOURCE_TYPE;

												let itemIcon = item.querySelectorAll(selectors.item.icon)[0];
												let icon = that._renderIcon(components[0]);
												itemIcon.appendChild(icon);

												that._elements.self.trigger("change");
											});
										}
									});
								});

								// unbind events on dialog close
								channel.one("dialog-closed", function() {
									selectList.off("coral-selectlist:change" + NS);
								});
							}
						});
					});
				} else {
					// editor layer unavailable, remove the insert component action
					that._elements.add.parentNode.removeChild(that._elements.add);
				}

				that._elements.self.on("coral-collection:remove", function(event) {
					that._toggleAddButton();
					let name = event.detail.item.dataset["name"];
					that._deletedChildren.push(name);
				});

				that._elements.self.on("coral-collection:add", function(event) {
					that._toggleAddButton();
					let name = event.detail.item.dataset["name"];
					let index = that._deletedChildren.indexOf(name);

					if (index > -1) {
						that._deletedChildren.splice(index, 1);
					}
				});
			},

			/**
			 * Reads the current state and updates ordered children cache
			 *
			 * @private
			 */
			_processChildren: function() {
				this._orderedChildren = [];
				let items = this._elements.self.items.getAll();

				for (let i = 0; i < items.length; i++) {
					let name = items[i].dataset["name"];
					this._orderedChildren.push(name);
				}
			},
			_toggleAddButton: function() {
				let that = this;
				let tabLimitInput = $(".dialog-childeditor-tab-limit").get(0);

				if (tabLimitInput) {
					that._elements.add.disabled = that._elements.self.items.length >= tabLimitInput.value;
				}
			}
		};
	})();

	/**
	 * Initializes Children Editors as necessary on content loaded event
	 */
	channel.on("foundation-contentloaded", function(event) {
		$(event.target).find(selectors.self).each(function() {
			new ChildrenEditor({
				el: this
			});
		});
	});

	/**
	 * Form pre-submit handler to process child updates
	 */
	$(window).adaptTo("foundation-registry").register("foundation.form.submit", {
		selector: "*",
		handler: function(form) {
			// one children editor per form
			let el = form.querySelectorAll(selectors.self)[0];
			let childrenEditor = $(el).data("childrenEditor");
			if (childrenEditor) {
				return {
					post: function() {
						return childrenEditor.update();
					}
				};
			} else {
				return {};
			}
		}
	});

}(jQuery, Granite.author, jQuery(document), this));