<script setup>

import {ref} from 'vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

const onClick = ref(false);
const onHover = ref(false);
const answerText = ref(null);
const savedAnswer = ref('')
const limitCharacterNumber = ref(80)
const makeEditable = () => {
  const answerOption = document.querySelector('.answer-option-text');
  const limitCharacterNumber = document.querySelector('.limitTime-number');
  if (answerOption.innerText === 'Add answer') {
    answerOption.innerText = '';
  }
  answerText.value.contentEditable = true;
  limitCharacterNumber.style.display = 'block';
  answerText.value.focus();

}
const setLimitedCharacter = () => {
  const answer = document.getElementsByClassName("answer-option-text");
  while (limitCharacterNumber.value < 100) {
    if (answer.length > 0) {
      limitCharacterNumber.value--;
    }
  }
}
const setStatus = () => {
  const answerOption = document.querySelector('.answer-option-text');
  const limitCharacterNumber = document.querySelector('.limitTime-number');
  if (answerOption.innerText === '') {
    answerOption.innerText = 'Add answer';
  }
  answerText.value.contentEditable = false;
  limitCharacterNumber.style.display = 'none';
}

</script>

<template>
  <div class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5" ref="container">
    <div class="answer-option-sign" ref="sign">
<span class=" sign-icon inline-block align-middle w-10 h-10 ">
</span>
    </div>
    <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">
      <div class="ans-contain overflow-auto w-full h-full">
        <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable" @blur="setStatus">
          <p class="answer-option-text text-black caret-white relative w-full" ref="answerText">Add answer</p>
          <span class="limitTime-number  hidden absolute right-1 top-0 rounded-full "
                ref="limitCharacterNumber">{{ limitCharacterNumber.value }}</span>
        </div>
      </div>
      <button
          class="add-img-btn flex-auto bg-transparent my-0 mx-0.5 w-5 h-5 border border-solid border-white transition ">

      </button>


    </div>
  </div>
</template>

<style>
.answer-option-container {
  @apply items-center w-1/2 p-1 relative overflow-visible justify-start flex flex-grow transition-all duration-200 ease-in-out rounded-md h-[5rem] min-h-[2.25rem] max-w-full bg-white text-gray-500 fill-current
}

.answer-option-container {
  box-shadow: rgba(0, 0, 0, 0.15) 0 -0.25rem 0 0 inset;
  width: calc(50% - 3rem);
}
.answer-option-edit{
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

  .answer-option-text:focus {
    @apply outline-none border-none text-lg text-black caret-black
  }

.sign-icon svg {
  fill: white;
}

@media (min-width: 600px)

.asw-res {
  min-height: 4rem;
}

</style>