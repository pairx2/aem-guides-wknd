
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import Cropper from 'cropperjs';
import * as FilePond from 'filepond';

(function(){
  'use strict';
  class fileUploadAndCropping{
    private cropper;
    constructor(elements) {
        this.fileUpload(elements);
    }

    /*
        @function
        @desc initialise file uploader
    */
    fileUpload(element) {
      var _self = this;      
      const enableCropping = element.getAttribute('data-enable-cropping');
      const fileTypeList = element.getAttribute('data-accepted-file-types') ? element.getAttribute('data-accepted-file-types').replace(/ /g, "").split(",") : [];
      FilePond.registerPlugin(
        FilePondPluginFileValidateSize,
        FilePondPluginFileValidateType,
        FilePondPluginImageValidateSize,
        FilePondPluginFileEncode,
      );
      // Create a FilePond instance
      const pond = FilePond.create(element.querySelector('input[type="file"]'), {
        labelIdle: element.querySelector('.m-file-uploader__labelElem').innerHTML,
        checkValidity: true,
        dropValidation: true,
        acceptedFileTypes: fileTypeList,
        imageValidateSizeMinWidth: parseInt(element.getAttribute('data-image-min-width')),
        imageValidateSizeMinHeight: parseInt(element.getAttribute('data-image-min-height')),
        maxFileSize: element.getAttribute('data-max-file-size'),
        labelMaxFileSize: element.getAttribute('data-label-max-file-size'),
        imageValidateSizeLabelImageSizeTooSmall: element.getAttribute('data-image-size-too-small'),
        labelFileTypeNotAllowed: element.getAttribute('data-label-file-type-not-allowed'),      
        server: {
          process: function(fieldName, file, metadata, load, error, progress, abort) {
              load(file);
              if(enableCropping === 'true') {
                _self.imageCroppper(element, file);         
              }else{
                _self.storeUploadedFile(element, file); 
              }
              _self.fileUploaded(element, file);
              element.querySelector('.a-form-grp').classList.remove('validation-error');
            },
            fetch: null,
            revert: null
          },
        },
      );
      const pondRoot = element.querySelector('.filepond--root'); 
      pondRoot.addEventListener('FilePond:error', (e: any) => {
        element.querySelector('.a-form-grp').classList.add('validation-error');
        if(e.detail.error.main !== null) {
          element.querySelector('.m-file-uploader__errormessage').innerHTML = e.detail.error.main;
        }
        pond.removeFile();
      });    
      element.querySelector('.m-file-uploader__removefile').addEventListener('click', function(){
        pond.removeFile();
        element.querySelector('.a-form-grp').classList.remove('validation-error');
        element.querySelector('.filepond--root').classList.remove('d-none');
        const fileuploaderFiledetails = element.querySelector('.m-file-uploader__filedetails');
        fileuploaderFiledetails.classList.add('d-none');
        element.querySelector('.m-file-uploader__cropconfirm')?.classList.add('d-none');
        if(element.querySelector('input[name=uploaded-file')) {
          element.querySelector('input[name=uploaded-file').value = "";
        }
      });
    }

    fileUploaded(elm, file){
      const fileuploaderFiledetails = elm.querySelector('.m-file-uploader__filedetails');
      fileuploaderFiledetails.classList.remove('d-none');
      fileuploaderFiledetails.querySelector('.m-file-uploader__name').innerHTML = file.name;
      fileuploaderFiledetails.querySelector('.m-file-uploader__size').innerHTML = this.formatBytes(file.size);
      elm.querySelector('.filepond--root').classList.add('d-none');
    }

    storeUploadedFile(ele, file) {
      let path = URL.createObjectURL(file);
      ele.querySelector('input[name=uploaded-file').value = path;
    }

    imageCroppper(ele, file) {
      const pond = ele.querySelector('.filepond--root');
      let cropWidth = ele.getAttribute('data-crop-width'); 
      let cropHeight = ele.getAttribute('data-crop-height'); 
      // Container to show the preview of uploaded image
      var photo_crop_container = $(ele);
      var crop_preview_cont = photo_crop_container.find('.m-file-uploader__cropcontainer');
      var filepond_img_Container = photo_crop_container.find('.m-file-uploader__imgcontainer')
      var photo_preview_container = photo_crop_container.find('.m-file-uploader__croppedimg');
      var img_cropping: JQuery<HTMLImageElement> = null;
      crop_preview_cont.slideDown('slow');            
      const image = new Image();
      image.src = URL.createObjectURL(file);
      filepond_img_Container.append(image);
      img_cropping = filepond_img_Container.find('img');
      img_cropping.attr('src', image.src);
      img_cropping.attr('id', 'cropImage');
      this.cropper = new Cropper(image, {
        viewMode: 3,
        dragMode: 'move',
        aspectRatio: 1 / 1,
        guides: false,
        cropBoxResizable: false,
        minCropBoxWidth: cropWidth != '' ? parseInt(cropWidth) : 500,
        minCropBoxHeight: cropHeight != '' ? parseInt(cropHeight): 500
      });
      var cropped_img = '';
      var _self = this;
      var photo__crop_confirm = photo_crop_container.find('.m-file-uploader__cropconfirm');
      photo__crop_confirm?.removeClass('d-none');
      photo__crop_confirm?.on('click', function(ev) {
          photo_crop_container.closest('.m-file-uploader').addClass('show-loader show-result');
          cropped_img = _self.cropper.getCroppedCanvas({
            width: cropWidth != '' ? parseInt(cropWidth) : 500,
              height: cropHeight != '' ? parseInt(cropHeight): 500,
              imageSmoothingEnabled: false,
              imageSmoothingQuality: 'high'
          }).toDataURL('image/jpeg');
          photo_preview_container.html('').append('<img src=""/>');
          photo_preview_container.find('img').attr('src', cropped_img);
          setTimeout(function() {
              photo_crop_container.closest('.m-file-uploader').removeClass('show-loader');
              photo__crop_confirm?.addClass('d-none');
          }, 1900);
      });
      pond.addEventListener('FilePond:removefile', function(e) {
        setTimeout(function() {
            photo_crop_container.closest('.m-file-uploader').removeClass('show-result');
        }, 1000);
        crop_preview_cont.slideUp();
        _self.cropper.reset();
        _self.cropper.clear();
        _self.cropper.destroy();
        photo_preview_container.html('');
        filepond_img_Container.html('');
        photo__crop_confirm?.addClass('d-none');
      }); 
    }

    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    
  }


  $(document).ready(function () {
    document.querySelectorAll('[data-js-component="file-upload"]').forEach(function(ele) {
        new fileUploadAndCropping(ele);
    });
  });
})();
