/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2016 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

(function ($, Granite) {
    "use strict";

    /**
     * Path to the workitem dialog.
     *
     * @constant
     * @private
     */
    var DIALOG_PATH = "/mnt/overlay/cq/inbox/content/inbox/dialogs/workitemcompletedialog";
    /**
     * Path to the inboxitem dialog.
     *
     * @constant
     * @private
     */
    var SHARE_INBOX_ITEM_DIALOG_PATH = "/mnt/overlay/cq/inbox/content/inbox/dialogs/shareinboxitemdialog";
    var INBOX_SHARE_INBOX_ITEM_DIALOG = "#shareInboxItemDialog";
    var INBOX_SHARES_INBOX_ITEM_WITH_TABLE = "#shares-inbox-item-with-table";
    var INBOX_SHARE_INBOX_ITEM_FORM = "#inbox-share-inbox-item-form";
    var INBOX_SHARE_INBOX_ITEM_SEARCH = "#inbox-share-inbox-item-search";
    var INBOX_SHARE_INBOX_ITEM_BUTTON = "#inbox-share-inbox-item-button";
    var ns = ".cq-inbox-share";
    var INBOX_SHARE_INBOX_ITEM_DELETE_ROW = "inbox-share-inbox-item-delete-row";
    var INBOX_SHARE_INBOX_ITEM_WITH_USER = "inbox-share-inbox-item-with-user";
    var INBOX_SHARES_INBOX_ITEM_WITH_TABLE_CONTAINER = "#inbox-shares-inbox-item-with-container";
    var INBOX_SHARE_INBOX_ITEM_SAVE = ".inbox-share-inbox-item-save";


    /**
     * Foundation UI API object.
     */
    var ui = $(window).adaptTo("foundation-ui");

    /**
     * Completes a workitem by showing a dialog which lets the user select the next workflow step.
     *
     * If the user successfully completes the workitem, the window is redirected to <code>successURL</code> (if specified) or else reloaded.
     *
     * @param {string} workitemId - the id of the workitem
     * @param {string} [successURL] - the URL to redirect to after the workitem has successfully been completed
     */
    window.CQ.Inbox.UI.commons.completeWorkitem = function (workitemId, successURL) {
        doWorkitemAction(workitemId,
            ".routes.json",
            "routes",
            Granite.I18n.get("Next Step"),
            Granite.I18n.get("Complete Work Item"),
            Granite.I18n.get("Failed to load workitem information. The selected item may no longer be available."),
            "advance",
            "route-",
            function (selectionChoices) {
                if (selectionChoices && selectionChoices.length > 1) {
                    return false;
                }
                return true;
            },
            null,
            successURL,
            true);
    };

    /**
     * Returns/Locks a workitem
     *
     * If the user can successfully return/lock the workitem, the window is redirected to <code>successURL</code> (if specified) or else reloaded.
     *
     * @param {string} cmd - action to be performed*
     * @param {string} workitemId - the id of the workitem
     * @param {string} errorHeader - Dialog header in case of error
     * @param {string} errorMessage - Dialog message in case of error
     */
    window.CQ.Inbox.UI.commons.doSharedAction = function (cmd, workItemId, errorHeader, errorMessage, successURL, shouldReload) {
        ui.wait();
        var submitAction = "/bin/workflow/inbox";
        var data = {
            "cmd": cmd,
            ":status": "browser",
            "_charset_": "utf-8",
            "item": workItemId
        };
        $.ajax({
            url: submitAction,
            type: "POST",
            data: data
        }).done(function () {
            renderSuccessPage(successURL, shouldReload);
        }).fail(function (xhr) {
            ui.clearWait();
            ui.prompt(
                Granite.I18n.get(errorHeader),
                Granite.I18n.get(errorMessage),
                "error",
                [{
                    text: Granite.I18n.get("OK"),
                    primary: true,
                    handler: function () {
                        // reload the list
                        renderSuccessPage(successURL, shouldReload);
                    }
                }]);
        });
    };

    /**
     * Steps back a workitem by showing a dialog which lets the user select a previous step in the workflow.
     *
     * If the user successfully steps back the workitem, the window is redirected to <code>successURL</code> (if specified) or else reloaded.
     *
     * @param {string} workitemId - the id of the workitem
     * @param {string} [successURL] - the URL to redirect to after the workitem has successfully been completed
     */
    window.CQ.Inbox.UI.commons.stepBackWorkitem = function (workitemId, successURL) {
        doWorkitemAction(
            workitemId,
            ".backroutes.json",
            "backroutes",
            Granite.I18n.get("Previous Step"),
            Granite.I18n.get("Step Back Item"),
            Granite.I18n.get("Failed to load the step back information. The selected item may no longer be available."),
            "advanceBack",
            "backroute-",
            function (selectionChoices) {
                if (selectionChoices) {
                    if (selectionChoices.length > 1) {
                        return false;
                    } else if (selectionChoices.length == 1) {
                        return true;
                    }
                }
                return true;
            },
            function (workitemRoutes) {
                if (workitemRoutes && workitemRoutes.length > 0) {
                    return false;
                } else {
                    ui.prompt(
                        Granite.I18n.get("Step Back"),
                        Granite.I18n.get("The selected item cannot step back."),
                        "info",
                        [{
                            text: Granite.I18n.get("OK"),
                            primary: true
                        }]);
                    // abort the submit
                    return true;
                }
            },
            successURL);
    };

    /**
     * Delegates a workitem by showing a dialog which lets the user select a user to assign the workitem to.
     *
     * If the user successfully delegates the workitem, the window is redirected to <code>successURL</code> (if specified) or else reloaded.
     *
     * @param {string} workitemId - the id of the workitem
     * @param {string} [successURL] - the URL to redirect to after the workitem has successfully been completed
     */
    window.CQ.Inbox.UI.commons.delegateWorkitem = function (workitemId, successURL) {
        doWorkitemAction(
            workitemId,
            ".delegatees.json",
            "delegatees",
            Granite.I18n.get("User"),
            Granite.I18n.get("Delegate Item"),
            Granite.I18n.get("Failed to load the delegation information. The selected item may no longer be available."),
            "delegate",
            "delegatee-",
            function (workitemRoutes) {
                if (workitemRoutes && workitemRoutes.length > 1) {
                    return false;
                }
                return true;
            },
            function (workitemRoutes) {
                if (workitemRoutes && workitemRoutes.length > 0) {
                    return false;
                } else {
                    ui.prompt(
                        Granite.I18n.get("Delegate Item"),
                        Granite.I18n.get("The selected item cannot be delegated."),
                        "info",
                        [{
                            text: Granite.I18n.get("OK"),
                            primary: true
                        }]);
                    // don't show the delegate dialog, just get out.
                    return true;
                }
            },
            successURL);
    };


    window.CQ.Inbox.UI.commons.shareInboxItem = function (inboxItemId, successURL, shouldReload, itemTitle) {
            CQ.Inbox.UI.commons.loadDialog(SHARE_INBOX_ITEM_DIALOG_PATH).done(function () {
                var inboxShareInboxItemDialog = $(INBOX_SHARE_INBOX_ITEM_DIALOG);
                var inboxShareInboxItemForm = inboxShareInboxItemDialog.find(INBOX_SHARE_INBOX_ITEM_FORM);
                var inboxSharesInboxItemWithTable = inboxShareInboxItemForm.find(INBOX_SHARES_INBOX_ITEM_WITH_TABLE);
                var inboxSharesInboxItemWithTableContainer = inboxShareInboxItemDialog.find(INBOX_SHARES_INBOX_ITEM_WITH_TABLE_CONTAINER);
                resetShareInboxItemDialog(inboxSharesInboxItemWithTable, inboxShareInboxItemForm);

                var dialogTitle = getShareDialogTitle(itemTitle);
                inboxShareInboxItemDialog[0].set({header: {innerHTML: dialogTitle}});

                if (inboxShareInboxItemDialog.length > 0) {
                    inboxShareInboxItemDialog.get(0).show();
                }
                window.CQ.Inbox.UI.tableUtils.toggleTableVisibility(INBOX_SHARES_INBOX_ITEM_WITH_TABLE, inboxSharesInboxItemWithTableContainer, INBOX_SHARE_INBOX_ITEM_SAVE);

                inboxShareInboxItemDialog.find(INBOX_SHARE_INBOX_ITEM_SEARCH)
                    .off('change' + ns)
                    .on('change' + ns, function () {
                       var isEntryUniqueCallback = (inboxSharecallback, inboxSharItemSearch) => {
                          return !checkDuplicateUsers(inboxShareInboxItemDialog, INBOX_SHARE_INBOX_ITEM_SEARCH);
                       };
                       window.CQ.Inbox.UI.tableUtils.toggleButton(INBOX_SHARES_INBOX_ITEM_WITH_TABLE, INBOX_SHARE_INBOX_ITEM_SEARCH, INBOX_SHARE_INBOX_ITEM_BUTTON, isEntryUniqueCallback);
                    });
                inboxShareInboxItemDialog.find(INBOX_SHARE_INBOX_ITEM_BUTTON)
                    .off('click' + ns)
                    .on('click' + ns, function () {
                        var userInfo = CQ.Inbox.UI.commons.getUserNameAndIdFromAutoComplete(INBOX_SHARE_INBOX_ITEM_SEARCH);
                        var deleteRowCallback = (event, tableId) => {
                          window.CQ.Inbox.UI.tableUtils.removeTableRow($(event.target).closest("tr"), null, tableId);
                          window.CQ.Inbox.UI.tableUtils.toggleTableVisibility(tableId, $(INBOX_SHARES_INBOX_ITEM_WITH_TABLE_CONTAINER), INBOX_SHARE_INBOX_ITEM_SAVE);
                        };

                        window.CQ.Inbox.UI.tableUtils.addTableRow(INBOX_SHARES_INBOX_ITEM_WITH_TABLE, userInfo, INBOX_SHARE_INBOX_ITEM_WITH_USER, INBOX_SHARE_INBOX_ITEM_DELETE_ROW, deleteRowCallback, false, false);
                        window.CQ.Inbox.UI.tableUtils.toggleTableVisibility(INBOX_SHARES_INBOX_ITEM_WITH_TABLE, inboxSharesInboxItemWithTableContainer, INBOX_SHARE_INBOX_ITEM_SAVE);
                        inboxShareInboxItemDialog.find(INBOX_SHARE_INBOX_ITEM_SEARCH).val(null);
                        inboxShareInboxItemDialog.find(INBOX_SHARE_INBOX_ITEM_BUTTON).attr("disabled", true);
                    });

                inboxShareInboxItemDialog.find(INBOX_SHARE_INBOX_ITEM_SAVE)
                    .off('click' + ns)
                    .on('click' + ns, function () {
                       var that = this;
                       ui.wait();
                       this.disabled = true;
                       var users = getExplicitShareUsersList(INBOX_SHARES_INBOX_ITEM_WITH_TABLE, INBOX_SHARE_INBOX_ITEM_WITH_USER);
                        saveExplicitSharingList(inboxItemId, "sharedwith-", users, successURL, shouldReload).done(function () {
                             renderSuccessPage(successURL, shouldReload);
                        })
                        .fail(function (xhr) {
                             ui.clearWait();
                             ui.prompt(
                                 Granite.I18n.get("Share Item"),
                                 Granite.I18n.get("Item can't be shared"),
                                 "error",
                                 [{
                                    text: Granite.I18n.get("OK"),
                                    primary: true,
                                    handler: function () {
                                       }
                                 }]);
                        })
                        .always(function() {
                             inboxShareInboxItemDialog.get(0).hide();
                             ui.clearWait();
                             that.disabled = false;
                         });
                     });
            }).fail(function (error) {
                ui.alert(Granite.I18n.get("Error"), error, "error");
            });

        };

    window.CQ.Inbox.UI.commons.getUserNameAndIdFromAutoComplete = function (autoCompleteId) {
         var autoCompleteElem = $(autoCompleteId);
         var userId, userDisplayName;

         if (autoCompleteElem != null && autoCompleteElem.length > 0) {
              userId = autoCompleteElem.val();
              userDisplayName = userId;
              // Get the id using 'value' of the autocomplete element
              // Display name is set in 'input' inside the autocomplete element
              var inputElem = autoCompleteElem.find("input");

              if (inputElem != null && inputElem.length > 0) {
                   userDisplayName = inputElem.val();
               }
         }
         return {
                 id: userId,
                 displayName: userDisplayName
          };
    };

    function resetShareInboxItemDialog(tableObject, formObject) {
        // clear table
        if (tableObject.length > 0) {
            tableObject.get(0).items.clear();
        }
        // reset form
        if (formObject.length > 0) {
            formObject.get(0).reset();
        }
    }

    function getExplicitShareUsersList(tableId, columnClass) {
        var userList = [];
        var elementList = $(tableId + " tr td." + columnClass + " span");
        $.each(elementList, function (index, element) {
            userList.push(element.innerText);
        });
        return userList;
    }

    function saveExplicitSharingList(inboxItemId, postDataSelector, usersList, successURL, shouldReload) {
        var submitAction = "/bin/workflow/inbox";
        var data = {
            "cmd": 'share',
            ":status": "browser",
            "_charset_": "utf-8",
            "item": inboxItemId
        };
        data[(postDataSelector + inboxItemId)] = usersList.join(",");
        return $.ajax({
            url: submitAction,
            type: "POST",
            data: data
        });
    }

    function getShareDialogTitle(itemTitle) {
        if (itemTitle) {
            return Granite.I18n.get("Share '{0}'", [itemTitle], "the title of item to be shared");
        } else {
            return Granite.I18n.get("Share Inbox Item");
        }
    }

    function checkDuplicateUsers(tableId, elementId) {
        return (getExplicitShareUsersList(tableId, INBOX_SHARE_INBOX_ITEM_WITH_USER).indexOf($(elementId).val()) >= 0) ? true : false;
    }

    var workitemActionDialogNS = ".cq-inbox-workitem-action-dialog";

    function submitInjectedDialogToPayload(payloadPath) {
        var deferred = $.Deferred();

        // we have a custom dialog -> need to post it to the payloadPath
        // and extend the workitem data with the dialog data
        if (payloadPath && payloadPath.length) {

            var originalDialog = $(".external-dialog-injection");
            var dialogClone = originalDialog.clone();

            // we're going to inject the original dialog into the temporary form to serialize
            // such that we can get the form data
            var dialogForm = $("<form>");
            originalDialog = originalDialog.replaceWith(dialogClone);

            // inject the original dialog into the form to serialize
            dialogForm.append(originalDialog);
            dialogForm.append('<input type="hidden" name=":status" value="browser">');

            // get the participants dialog data which will be merged with the rest of the
            // data coming in to the save(data) function and the rest of the form data
            var dialogData = dialogForm.serializeAsJSON();


            // make sure we have fields that start with './' otherwise we can't submit to the payload
            if (hasDotSlash(dialogData)) {
                // replace the dialog that once was there, in the case that the post's fail
                // we put it back to the way it was
                var decoy = $(".external-dialog-injection");
                decoy.replaceWith(originalDialog);

                $.ajax({
                    type: "POST",
                    url: Granite.HTTP.externalize(payloadPath),
                    data: dialogData
                }).done(function () {
                    let formData = originalDialog.closest("form").serializeAsJSON();
                    // pass on the formdata to include in the save.
                    deferred.resolve(formData);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    deferred.reject(jqXHR, textStatus, errorThrown);
                });
            } else {
                // continue with the custom data that we have not yet used:
                let formData = originalDialog.closest("form").serializeAsJSON();
                // pass on the formdata to include in the save.
                deferred.resolve(formData);
            }
        } else {
            deferred.resolve();
        }
        return deferred;
    }

    function renderSuccessPage(successURL, shouldReload) {
        var omniSearchForm = $(".granite-omnisearch-form");
        if (omniSearchForm.length > 0) {
            // we're in omnisearch -> just re-submit the search form
            omniSearchForm.submit();
        } else {
            if (successURL) {
                window.location.href = Granite.HTTP.getContextPath() + successURL;
            } else {
                /*If the reload parameter is passed, then use its value to determine if it is required to reload or not
                 Otherwise, reload always
                 */
                if (shouldReload) {
                    if (shouldReload === true) {
                        window.location.reload(true);
                    }
                } else {
                    window.location.reload(true);
                }
            }
        }
    }

    function hasDotSlash(dialogData) {
        if (dialogData) {
            for (var property in dialogData) {
                if (dialogData.hasOwnProperty(property)) {
                    if (property.startsWith("./")) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function doWorkitemAction(itemId,
                              dropdownSelector,
                              dropdownJSONSelector,
                              dropdownLabel,
                              title,
                              errorMessage,
                              command,
                              postDataSelector,
                              isSelectReadonlyCallback,
                              abortActionCallback,
                              successHref,
                              injectCustomDialog) {

        //Close the already open dialog, remove from DOM and load dialog again
        var dialog = $("#workitemCompletionDialog");
        CQ.Inbox.UI.commons.removeDialog(dialog, DIALOG_PATH);

        CQ.Inbox.UI.commons.loadDialog(DIALOG_PATH).done(function () {
            var routeSourceURL = itemId + dropdownSelector;
            
            $('#workitemCompletionDialog coral-dialog-header').text(title);

            $.get(Granite.HTTP.externalize(routeSourceURL))
                .done(function (routeInfoAsJSON) {
                    var workitemRoutes;
                    if (routeInfoAsJSON && routeInfoAsJSON[dropdownJSONSelector]) {
                    	workitemRoutes = routeInfoAsJSON[dropdownJSONSelector];
                    		if (command === "advanceBack") {
                            	workitemRoutes = deleteAbbottWorkflowSteps(itemId, workitemRoutes);
                            }
                        
                    }

                    //Clear the custom injected fields if the dialog is already open
                    $(".cq-inbox-dialog-injection-anchor").empty();


                    loadCustomDialogInjection(itemId, injectCustomDialog)
                        .done(function (injectionHTML) {
                            ui.clearWait();
                            if (injectionHTML) {
                                $(".cq-inbox-dialog-injection-anchor")
                                    .append(injectionHTML);
                                //fix for CQ-4215179
                                $(".cq-inbox-dialog-injection-anchor").trigger("foundation-contentloaded");
                            }


                            var submitAction = "/bin/workflow/inbox";
                            var form = $("#updatetaskform");
                            let dialog = $("#workitemCompletionDialog");

                            var select = dialog.find("coral-select").get(0);
                            if (select && select.items) {
                                select.items.clear();
                            }
                            var commentField = $("[name=comment]", dialog);
                            if (commentField) {
                                commentField.val("");
                            }

                            if (workitemRoutes && workitemRoutes.length > 0) {
                                select.show();
                                for (var routeIndex = 0; routeIndex < workitemRoutes.length; routeIndex++) {
                                    var workitemRoute = workitemRoutes[routeIndex];

                                    select.items.add({
                                        content: {
                                            innerHTML: workitemRoute.label_xss
                                        },
                                        value: workitemRoute.rid
                                    });
                                }
                            } else {
                                select.hide();
                            }

                            if(command === "advance"){
                            	addAbbottWorkflowInfo(itemId);
                            }
                            
                            var $select = $(".workitem-dialog-select");
                            var coralSelect = $select[0];

                            coralSelect.readOnly = isSelectReadonlyCallback(workitemRoutes);
                            if (abortActionCallback && abortActionCallback(workitemRoutes)) {
                                return;
                            }

                            var coralDialog = dialog.get(0);
                            coralDialog.show();

                            

                            //CQ-4270423 Not ideal having to use a corral class name but there's not much choice.
                            // using coral-overlay:close as we did previously causes CQ-4270423.
                            // we need to handle both cancel and the Dialog close button separately but don't have
                            //access to the button to add our own class to it.
                            dialog.find(".coral3-Dialog-closeButton")
                                .off('click' + workitemActionDialogNS)
                                .on('click' + workitemActionDialogNS, function () {
                                    $(".cq-inbox-dialog-injection-anchor").empty();
                                });

                            dialog.find(".workitem-complete-dialog-cancel")
                                .off('click' + workitemActionDialogNS)
                                .on('click' + workitemActionDialogNS, function () {
                                    $(".cq-inbox-dialog-injection-anchor").empty();
                                });

                            var fileList = [];
                            var fileUploadElement = $("form coral-fileupload")[0];
                            if (fileUploadElement != undefined) {
                                fileUploadElement.setAttribute("async", true);

                                var fileAttachmentList = document.createElement('div');
                                fileAttachmentList.setAttribute("id", "fileAttachments");
                                fileUploadElement.appendChild(fileAttachmentList);

                                fileUploadElement.addEventListener("coral-fileupload:fileadded", () => {
                                    // Handling of single/multiple file uploads based on value of 'multiple' attribute
                                    // to upload a new file, when multiple uploads are not allowed and fileList already has a file, remove the existing file from fileList and fileAttachmentList
                                    if (!fileUploadElement.multiple && fileList.length == 1) {
                                        fileList.pop();
                                        fileAttachmentList.removeChild(fileAttachmentList.childNodes[0]);
                                    }

                                    // add the uploaded file to fileList and fileAttachmentList (for displaying on the UI)
                                    var item = event.detail.item;
                                    fileList.push(item);
                                    var file = document.createElement('div');
                                    var textNode = document.createTextNode(item.file.name);
                                    file.appendChild(textNode);
                                    fileAttachmentList.appendChild(file);
                                });
                            }

                            dialog.find(".workitem-complete-dialog-submit")
                                .off('click' + workitemActionDialogNS)
                                .on('click' + workitemActionDialogNS, function () {
                                    var that = this;

                                    if (!checkRouteSelection()) {
                                        // this should somehow indicate that the
                                        // selected action is invalid.
                                        return;
                                    }

                                    if (!validateFormFields(dialog)) {
                                        return;
                                    }

                                    ui.wait();
                                    this.disabled = true;

                                    var injectedSubmitDeferred = $.Deferred();
                                    var payloadPath = $(".external-dialog-injection").data("payloadpath");
                                    var coralFileUploadDefer = $.Deferred();
                                    var allCoralFileUploadDefer = [];

                                    //fix added for CQ-4261413 custom dialog file upload support
                                    if (fileList.length != 0) {
                                        $("form coral-fileupload").each(function (index, element) {
                                            var $element = $(element);
                                            var defer = $.Deferred();
                                            var folderName = $element.attr("name");
                                            if (folderName) {
                                                //remove '.' if it exists to be allow appending to path.
                                                if (folderName.indexOf("./") == 0) {
                                                    folderName = folderName.substr(1);
                                                }
                                            }
                                            allCoralFileUploadDefer.push(defer);

                                            // ajaxUpload uploads the file under the path specified using the 'action' attribute of the coral upload element.
                                            // ajaxUpload uses the 'name' attribute defined on the element for naming the actual file. So, for our usecase, this is reset to the file name.

                                            fileList.forEach((item) =>{
                                                var fileName = item.file.name;
                                                element.setAttribute("name", fileName);
                                                element.action = Granite.HTTP.getContextPath() + payloadPath + folderName;
                                                element._ajaxUpload(item);
                                            });

                                            element.addEventListener("coral-fileupload:loadend", () => {
                                                defer.resolve();
                                            });
                                        });

                                    }

                                    $.when.apply($, allCoralFileUploadDefer).done(function() {
                                        coralFileUploadDefer.resolve();
                                    });

                                    if (injectionHTML && payloadPath) {
                                        injectedSubmitDeferred = submitInjectedDialogToPayload(payloadPath);
                                    } else {
                                        injectedSubmitDeferred.resolve();
                                    }

                                    injectedSubmitDeferred.done(function (extendedFormData) {
                                        $.when(coralFileUploadDefer).done(function() {
                                            submitForm(form, submitAction, itemId, command, postDataSelector, extendedFormData)
                                                .done(function () {
                                                    $(".cq-inbox-dialog-injection-anchor").remove();

                                                    if (successHref) {
                                                        window.location = Granite.HTTP.getContextPath() + successHref;
                                                    } else {
                                                        window.location.reload(true);
                                                    }
                                                })
                                                .fail(function (xhr) {
                                                    form.trigger("foundation-form-submit-callback", [xhr]);
                                                    coralDialog.hide();
                                                    ui.clearWait();
                                                    that.disabled = false;
                                                }).done(function () {
                                                // remove the injected dialog pieces...
                                                $(".cq-inbox-dialog-injection-anchor").empty();
                                            });
                                        });
                                    });
                                });
                        }).fail(function () {
                        ui.clearWait();
                        ui.prompt(
                            title,
                            errorMessage,
                            "error",
                            [{
                                text: Granite.I18n.get("OK"),
                                primary: true,
                                handler: function () {
                                    // reload the list
                                    window.location.reload(true);
                                }
                            }]);
                    });
                }).fail(function () {
                    ui.clearWait();
                    ui.prompt(
                        title,
                        errorMessage,
                        "error",
                        [{
                            text: Granite.I18n.get("OK"),
                            primary: true,
                            handler: function () {
                                // reload the list
                                window.location.reload(true);
                            }
                        }]);
                });
        }).fail(function (error) {
            ui.clearWait();
            ui.alert(Granite.I18n.get("Error"), error, "error");
        });
    }


    function checkRouteSelection() {
        var actionSelect = $("#workitemCompletionDialog").find("coral-select");
        if (actionSelect.length > 0) {
            // only check the actions if the action select is not hidden
            if (!actionSelect[0].hidden) {
                if (!actionSelect.val()) {
                    return false;
                }
            }
        }
        return true;
    }

    function addAbbottWorkflowInfo(itemId){
        //add abbott dialog fields 
        if(itemId.indexOf("abbott-global-workflow") > -1){
            
            console.log("inside of the abbott global workflow logic")
            var url = Granite.HTTP.externalize(itemId.split("/workItems")[0]+"/metaData.json");
                $.get(url).done(function (workflowInfo) {

		            if (itemId.indexOf("node3") > -1) {
		            	if (workflowInfo.currentStep != "First Approver") {
		            		workflowInfo.currentStep = "First Approver";
		            	}
		            	if (workflowInfo.secondassignment) {
		            		workflowInfo.nextStep = "Second Approver";
		            	} else {
		            		workflowInfo.nextStep = "Final Approval";
		            	}
		            } else if (itemId.indexOf("node7") > -1) {
		            	if (workflowInfo.currentStep != "Second Approver") {
		            		workflowInfo.currentStep = "Second Approver";
		               		workflowInfo.nextStep = "Final Approval";
		          		}  	          
		            } else if (itemId.indexOf("node9") > -1) {
		            	if (workflowInfo.currentStep != "Final Approval") {
		            		workflowInfo.currentStep = "Final Approval";
		            		}
		            }
                    if (document.getElementsByName("currentstep")[0]) {
                    	document.getElementsByName("currentstep")[0].value = workflowInfo.currentStep;
                    }
                    if (document.getElementsByName("nextstep")[0]) {
                    	document.getElementsByName("nextstep")[0].value = workflowInfo.nextStep;
                    }
                    if (document.getElementsByName("successevent")[0]) {
                    	document.getElementsByName("successevent")[0].value = workflowInfo.workflowtype;
                    }
                    if (document.getElementsByName("absoluteTime")[0]) {
                        var workflowDate = new Date(workflowInfo.absoluteTime).toISOString();
                        document.getElementsByName("absoluteTime")[0].value = workflowDate;
                    }
                }).fail(function () {
                    // signal load failure
                    deferred.reject(Granite.I18n.get("Unable to load " + workflowInfo));
                });

            $(".workitem-dialog-select").parent().hide();
        }
    }
    
    function deleteAbbottWorkflowSteps(itemId, workitemRoutes){
        //add abbott dialog fields 
        var newWorkitemRoutes = [];
        if(itemId.indexOf("abbott-global-workflow") > -1){
            console.log("inside of the abbott global workflow logic")
            for (var routeIndex = 0; routeIndex < workitemRoutes.length; routeIndex++) {
				var workitemRoute = workitemRoutes[routeIndex];
				var stepName = workitemRoute.label;
				if (stepName === "Assign Workflow" || stepName === "First Approver" || stepName === "Second Approver") {
					newWorkitemRoutes.push(workitemRoute);
				}
				
            }
            workitemRoutes = newWorkitemRoutes;
        }
        return workitemRoutes;

    }


    function loadCustomDialogInjection(itemId, checkForDialog) {
        // create and store a new deferred object
        var deferred = $.Deferred();

        if (itemId && checkForDialog) {
            // load the dialog
            var url = Granite.HTTP.externalize("/libs/cq/inbox/content/inbox/dialogs/dialogInjectionRender.html?item=" + encodeURIComponent(itemId) + "&ch_ck=" + Date.now());
            $.get(url).done(function (injectionHTML) {
                deferred.resolve(injectionHTML);
            }).fail(function () {
                // signal load failure
                deferred.reject(Granite.I18n.get("Unable to load " + itemId));
            });
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    }

    function submitForm($form, postUrl, taskId, command, postDataSelector, extendedFormdata) {
        var $nextStepSelect = $("#workitemCompletionDialog").find("coral-select");
        var coralNextStepSelect = $nextStepSelect[0];

        var data = {
            "cmd": command,
            ":status": "browser",
            "_charset_": "utf-8",
            "item": taskId
        };

        if (extendedFormdata) {
            $.extend(data, extendedFormdata);
        }

        data[(postDataSelector + taskId)] = coralNextStepSelect.value;
        data[("comment-" + taskId)] = $("[name=comment]", "#workitemCompletionDialog").val();

        return $.ajax({
            url: postUrl,
            type: "POST",
            data: data
        });
    }

    function validateFormFields(dialog) {
        var isFormValid = true;
        var fields = dialog.find(".coral-Form-field").toArray();

        fields.forEach(function (field) {
            var api = $(field).adaptTo("foundation-validation");
            if (api) {
                if (!api.checkValidity()) {
                    isFormValid = false;
                }
                api.updateUI();
            }
        });

        return isFormValid;
    }

})(Granite.$, Granite);