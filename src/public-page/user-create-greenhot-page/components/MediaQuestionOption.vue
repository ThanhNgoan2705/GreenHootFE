<script setup  lang="ts">
import { ref } from 'vue';
import { MDBIcon } from 'mdb-vue-ui-kit';
const hasBackgroundImage = ref(false);
const emit = defineEmits(['update:backgroundImage']);
const upLoadImage = () => {
  const input = document.createElement('input') as HTMLInputElement;
  const imageWrap = document.querySelector('.media-img-wrap') as HTMLElement;
  const backgroundImage = document.querySelector('.media-img') as HTMLElement;
  const trashIcon = document.querySelector('.media-action') as HTMLElement;
  const bgContainer = document.querySelector('.mediaInfo') as HTMLElement;
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const img = document.createElement('img');
   
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const formData = new FormData();
    // Append the file to the formData object
    formData.append('file', file);
    fetch('http://localhost:8080/upload', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID',
      },
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        img.src = data;
        sessionStorage.setItem('imageQuestion',data);
        console.log(data);
     
      })
        // Remove the existing img element if it exists
        const existingImg = backgroundImage.querySelector('img');
        if (existingImg) {
          backgroundImage.removeChild(existingImg);
        }
        emit('update:backgroundImage', img.src);
        // Append the new img element
        backgroundImage.append(img);
        hasBackgroundImage.value = true;
        imageWrap.classList.remove('hidden');
        trashIcon.classList.remove('hidden');
        bgContainer.classList.add('hidden');
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
};

const removeBgImage = () => {
  const imageWrap = document.querySelector('.media-img-wrap') as HTMLElement;
  const backgroundImage = document.querySelector('.media-img') as HTMLElement;
  const trashIcon = document.querySelector('.media-action') as HTMLElement;
  const bgContainer = document.querySelector('.mediaInfo') as HTMLElement;
  // Remove the img element from the backgroundImage element
  const img = backgroundImage.querySelector('img');
  if (img) {
    backgroundImage.removeChild(img);
    emit('update:backgroundImage', '')
  }
  hasBackgroundImage.value = false;
  imageWrap.classList.add('hidden');
  bgContainer.classList.remove('hidden');
  trashIcon.classList.add('hidden');
};


</script>

<template>
  <header class=" media-container style-question">
    <div class="media-detail box-border">
      <div class="media-qs-detail box-border">
        <div class="media-detail-wrap min-h-[260px] min-w-[200px]"
             style="">
          <div class="mediaInfo">
            <div class="add-qs-image flex flex-col items-center justify-center">
              <div class="media-library "/>
              <div class="add-qs-image-icon flex w-12 h-12 bg-white rounded-sm items-center justify-center">
                <button  @click="upLoadImage"><MDBIcon icon="plus" size="2x"/></button>
              </div>
            </div>
          </div>
          <div class="media-action hidden">
            <div class="media-action-icon   flex w-9 h-9 bg-white rounded-sm items-center justify-center">
              <button><MDBIcon icon="trash" size="lg" @click="removeBgImage" /></button>
            </div>
          </div>
          <div class="media-img-wrap hidden ">
            <div class="media-img ">
            </div>
          </div>

        </div>
      </div>
    </div>
  </header>
</template>

<style >
.media-container {
  padding: 1.375rem 0px;
  flex: 4 0 auto;
  -webkit-box-align: stretch;
  align-items: stretch;
}
.style-question {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex: 6 1 0%;
  position: relative;
}
.media-detail {
  --panel-background-color: rgba(250, 250, 250, 0.7);
  padding: 0px 1rem;
  width: 100%;
  height: 100%;
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
}
.media-qs-detail{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}
.media-detail-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  opacity: 1;
  background: var(--panel-background-color);
  backdrop-filter: blur(12px);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  min-height: 9.875rem;
  min-width: 14.8125rem;
}
.media-detail-wrap{
  max-width: 24.375rem;max-height: 16.25rem; --max-width: 24.375rem;  --max-height: 16.25rem;
}

.mediaInfo{
  display: flex;
  flex: 0 1 auto;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0px 1rem;
  cursor: pointer;
  flex-direction: column;
  width: 100%;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  border-radius: 4px;
  height: 100% !important;
}
.media-img-wrap{
  @apply h-full w-full m-auto absolute inset-1 z-0;
}
.media-img{
  @apply relative h-[99.95%]  w-[99.95%] rounded overflow-hidden ;
}
.media-img img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
}
.media-action{
  @apply h-12 w-12 absolute right-2 bottom-1 z-10;
}
.media-library{
  display: flex;
  background-image: url("src/public-page/image/media-qs.svg");
  background-repeat: no-repeat;
  background-position: center center;
  width: 186px;
  height: 80px;
  filter: brightness(0.5);
  margin-block-end: 8px;
}

</style>