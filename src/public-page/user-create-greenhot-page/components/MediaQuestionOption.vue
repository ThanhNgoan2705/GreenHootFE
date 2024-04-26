<script setup>
import { ref } from 'vue';
import { MDBIcon } from 'mdb-vue-ui-kit';
const hasBackgroundImage = ref(false);
const upLoadImage = () => {
  const input = document.createElement('input');
  const backgroundImage = document.querySelector('.media-detail-wrap');
  const trashIcon = document.querySelector('.media-action');
  input.type = 'file';
  // just image files with .png, .jpg, .jpeg, .gif and .svg extensions
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      backgroundImage.style.backgroundImage = `url(${e.target.result})`;
      hasBackgroundImage.value = true;
      trashIcon.classList.remove('hidden');
      console.log(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  input.click();
};
const removeBgImage = () => {
  const backgroundImage = document.querySelector('.media-detail-wrap');
  const trashIcon = document.querySelector('.media-action');
  backgroundImage.style.backgroundImage = '';
  hasBackgroundImage.value = false;
  trashIcon.classList.add('hidden');
};
</script>

<template>
  <header class=" media-container style-question">
    <div class="media-detail box-border">
      <div class="media-qs-detail box-border">
        <div class="media-detail-wrap min-h-[260px] min-w-[200px]"
             style="max-width: 24.375rem;max-height: 16.25rem; --max-width: 24.375rem;  --max-height: 16.25rem;">
          <div class="mediaInfo">
            <div class="add-qs-image flex flex-col items-center justify-center">
              <div class="media-library "/>
              <div class="add-qs-image-icon flex w-12 h-12 bg-white rounded-sm items-center justify-center">
                <button  @click="upLoadImage"><MDBIcon icon="plus" size="2x"/></button>
              </div>
            </div>
            <div class="media-action  hidden absolute right-2 bottom-1  ">
              <div class="media-action-icon   flex w-9 h-9 bg-white rounded-sm items-center justify-center">
                <button><MDBIcon icon="trash" size="lg" @click="removeBgImage" /></button>
              </div>
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

.mediaInfo {
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