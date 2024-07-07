<script setup lang="ts">
import { onMounted, ref} from 'vue'
import {MDBIcon} from 'mdb-vue-ui-kit'

const onClick = ref(false);
const symbol = ref({
  0: 'square-full',
  1: 'star'
})
const cardText = ref({
  0: 'True',
  1: 'False'
})
onMounted(() => {
    const answerContainer = document.querySelectorAll('.answer-option-container') as NodeListOf<HTMLElement>;
    const  iconTick = document.querySelectorAll('.icon-tick') as NodeListOf<HTMLElement>;
    const color = ['rgb(226,27,60)', 'rgb(19,104,206)'];
    let i = 0;
    while (i < answerContainer.length) {
      answerContainer[i].style.backgroundColor = color[i];
      iconTick[i].classList.add('hidden');
      i++;
    }
});
const markTrueAnswer = (index: number) => {
  const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
  const iconTick = document.querySelectorAll('.icon-tick') as NodeListOf<HTMLElement>;
  radioBtn.forEach((radio, i) => {
    if (i === index) {
      radio.style.backgroundColor = 'rgb(102, 191, 57)';
      iconTick[i].classList.remove('hidden');
      onClick.value = true;
    } else {
      radio.style.backgroundColor = 'transparent';
      iconTick[i].classList.add('hidden');
      onClick.value = false;
    }
  });
}
</script>

<template>
  <div class="answer-options w-full  h-full mb-[3rem]">
    <div v-for="(item , index) in 2" :key="index"
         :class="`answer-option-${index}`"
         ref="cardAnswers"
         class="answer-option-container asw-res py-0.5 px-0.5 my-0.5 mx-0.5"
    >
      <div class="answer-option-sign" ref="sign">
        <span class=" sign-icon inline-block align-middle w-10 h-10 "/>
      </div>
      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="xl" class="text-white absolute left-4 top-1/2"/>
      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">
        <div class="ans-contain  w-full h-full">
          <div class="answer-option-edit whitespace-pre-wrap break-words box-border">
            <p class="answer-option-text relative w-full"
               ref="answerText" >
              <span class="text-black text-lg true-false-text"
              >
                {{ cardText[index as keyof typeof cardText] }}
              </span>
            </p>
          </div>
        </div>
        <button role="switch"
                aria-checked="false"
                aria-label="Add audio"
                class=" radio-btn add-audio-btn "
                @click="markTrueAnswer(index)">
          <span class="icon-tick">
            <MDBIcon icon="check" size="2xl"  class=" text-white" />
            </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.answer-options {
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
}
.answer-option-container {
  @apply items-center  p-1 relative overflow-visible justify-start flex flex-grow transition-all duration-200 ease-in-out rounded-md h-[7rem] min-h-[2.25rem] max-w-full text-gray-500 fill-current
}
.answer-option-container {
  box-shadow: rgba(0, 0, 0, 0.15) 0 -0.25rem 0 0 inset;
}

.answer-option-edit {
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: clamp(8px, 1.2vmin, 16px);
  -webkit-box-pack: start;
  justify-content: flex-start;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: clamp(1rem, 1.8vmin, 1.375rem);
  color: rgb(255, 255, 255);
  caret-color: rgb(0, 0, 0);
  line-height: 1.25;
  cursor: text;
}

.answer-option-edit {
  @apply bg-contain bg-no-repeat ms-2 me-2.5 bg-left
}

.answer-option-sign {
  flex: 0 0 auto;
  border-radius: 4px;
  height: calc(100% - 1rem);
  margin: 0 0.25rem 0.25rem;
  padding: 0;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transition: box-shadow 0.2s ease 0s, background 0.2s ease 0s, opacity 0.2s ease 0s;
}
.answer-option-text {
  color: black;
}
.answer-option-text:focus {
  @apply outline-none border-none text-lg;
}
.answer-option-text img {
  object-fit: contain;
  width: calc(100% - 2 * 10px); /* Subtracting twice the padding from the width */
  height: calc(100% - 2 * 10px); /* Subtracting twice the padding from the height */
  padding: 10px
}
.sign-icon svg {
  fill: white;
}
@media (min-width: 600px) {

  .asw-res {
    min-height: 4rem;
  }
}

.answer-option-0 .answer-option-sign  {
  background-color: rgb(226, 27, 60);
}


.answer-option-1 .answer-option-sign {
  background-color: rgb(19, 104, 206);
}

@keyframes radioAnimation {
  0% {
    transform: translateY(0px) scaleX(1) scaleY(1);
  }
  5% {
    transform: translateY(0px) scaleX(1.1) scaleY(0.9);
  }
  10% {
    transform: translateY(-10px) scaleX(0.9) scaleY(1.1);
  }
  15% {
    transform: translateY(0px) scaleX(1.1) scaleY(0.9);
  }
  20% {
    transform: translateY(-5px) scaleX(0.95) scaleY(1.05);
  }
  25% {
    transform: translateY(0px) scaleX(1.05) scaleY(0.95);
  }
  30% {
    transform: translateY(-2.5px) scaleX(0.95) scaleY(1.05);
  }
  35% {
    transform: translateY(0px) scaleX(1.05) scaleY(0.95);
  }
}

.add-audio-btn {
  flex: 0 0 auto;
  background: transparent;
  margin: 0 0.5rem;
}
.radio-btn {
  display: inline-block;
  position: relative;
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  background: transparent;
  border: 0.25rem solid rgb(255, 255, 255);
  transition: background 0.2s ease 0s;
  transform-origin: center bottom;
  box-shadow: transparent 0 0 0 0.125rem, rgba(0, 0, 0, 0.35) 0px 0.125rem 0.125rem, rgba(0, 0, 0, 0.35) 0px 0px 0px 0.0625rem;
  animation: radioAnimation 4s infinite;
}
</style>