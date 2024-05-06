<script setup lang="ts">

import {nextTick, onMounted, ref} from 'vue';
import {MDBIcon} from 'mdb-vue-ui-kit';
import {answerCards} from "@/stores/answerCards";
const questionType = ref({
  0: 'Multiple choice',
  1: 'True or False',
  2: 'Type Answer',
  3: 'Puzzle'
})

const store = answerCards();
const onClick = ref(false);
let answerText = ref<HTMLElement | null>(null);
const savedAnswer = ref('');
const limitCharacterNumber = ref(80);
const symbol = ref({
  0: 'heart',
  1: 'square-full',
  2: 'circle',
  3: 'star'
})

const makeEditable = (index: number) => {
  const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
  const limitNumber = document.querySelectorAll('.limitTime-number') as NodeListOf<HTMLElement>;
  answerOption.forEach((answer, i) => {
    let currentAnswerText = answer; // Create a new local variable to store the current answer option
    if (i === index) {
      currentAnswerText.innerText= ' ';// Save the current answer text
      currentAnswerText.contentEditable = 'true'; // Make the answer option editable
      currentAnswerText.focus(); // Focus on the answer option
      savedAnswer.value = currentAnswerText.innerText;
      limitNumber[i].style.display = 'block'; // Display the character limit
      limitNumber[i].innerText = MAX_CHARACTER - currentAnswerText.innerText.length + ''; // Display the remaining character
    } if(i !== index && answer.innerText === '') {
      currentAnswerText.innerText = 'Add answer ' + (i + 1); // Restore the answer text
      currentAnswerText.contentEditable = 'false'; // Make the answer option not editable
      limitNumber[i].style.display = 'none'; // Hide the character limit
    }
  });
}
const MAX_CHARACTER = 80;
onMounted(() => {
  const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
  const limitNumber = document.querySelectorAll('.limitTime-number') as NodeListOf<HTMLElement>;
  answerOption.forEach((answer, index) => {
    answer.addEventListener('input', () => {
      if (answer.innerText.length > MAX_CHARACTER) {
        answer.innerText = answer.innerText.slice(0, MAX_CHARACTER);
      }
      limitNumber[index].innerText = MAX_CHARACTER - answer.innerText.length + '';
    });
  });
});
const setStatus = (index?: number) => {
  onClick.value = false;
  nextTick(() => {
    const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
    const limitNumber = document.querySelectorAll('.limitTime-number') as NodeListOf<HTMLElement>;
    answerOption.forEach((answer, i) => {
      if (i !== index && answer.innerText === '') {
        answer.innerText = savedAnswer.value || 'Add answer ' + (i + 1);// Restore the answer text
        limitNumber[i].style.display = 'none';
      }
    });
  });
}
onMounted(() => {
  document.addEventListener('click', (event) => {
    const cardAnswers = document.querySelectorAll('.answer-option-container') as NodeListOf<HTMLElement>;
    cardAnswers.forEach((card, index) => {
      if (!card.contains(event.target as Node)) {
        setStatus(index);
      }
    });
  });
});
const changeBGColor = (index: number) => {
  const color = ['rgb(226,27,60)', 'rgb(19,104,206)', 'rgb(0,128,0)', 'rgb(216, 158, 0)'];
  const answerContainer = document.querySelectorAll('.answer-option-container') as NodeListOf<HTMLElement>;
  answerContainer.forEach((answer, i) => {
    if (i === index) {
      answer.style.backgroundColor = color[i];
    }
  });
}
const changeBgColorOnInput = (index: number) => {
  const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
  const answerContainer = document.querySelectorAll('.answer-option-container') as NodeListOf<HTMLElement>;
  const actionButton = document.querySelectorAll('.add-img-btn') as NodeListOf<HTMLElement>;
  const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
  // Create a new local variable to store the current answer option
  answerOption.forEach((answer, i) => {
    if (i === index && answer.innerText !== '') {
      changeBGColor(index)
      actionButton[i].style.display = 'none';
      radioBtn[i].style.display = 'block';
    } else if (i !== index && answer.innerText === '') {
      console.log('i', i);
      console.log('index', index)
      changeBGColor(index)
      actionButton[i].style.display = 'block';
      radioBtn[i].style.display = 'none';
    }
  });
}
const uploadImage = (index: number) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.click();
  fileInput.onchange = (e) => {
    if (e.target && e.target instanceof HTMLInputElement && e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
          const answerContainer = document.querySelectorAll('.answer-option-container') as NodeListOf<HTMLElement>;
          const actionButton = document.querySelectorAll('.add-img-btn') as NodeListOf<HTMLElement>;
          const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
          const removeBtn = document.querySelectorAll('.remove-btn') as NodeListOf<HTMLElement>;
          const answerText = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
          answerOption.forEach((answer, i) => {
            if (i === index) {
              answer.innerText = '';
              answerContainer[i].style.backgroundColor = 'white';
              actionButton[i].style.display = 'none';
              radioBtn[i].style.display = 'block';
              removeBtn[i].style.display = 'block';
              answerText[i].innerText = '';
              answerText[i].appendChild(document.createElement('img')).src = (e.target as FileReader).result as string;
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
}
onMounted(() => {
  const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
  answerOption.forEach((answer, index) => {
    answer.addEventListener('input', () => {
      changeBgColorOnInput(index);
    });
  });
});
const markTrueAnswer = (index: number) => {
  const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
  const iconTick = document.querySelectorAll('.icon-tick') as NodeListOf<HTMLElement>;
  radioBtn.forEach((radio, i) => {
    if (i === index) {
      radio.style.backgroundColor = 'rgb(102, 191, 57)';
      iconTick[i].style.display = 'block';
      onClick.value = true;
    } else {
      radio.style.backgroundColor = 'transparent';
      iconTick[i].style.display = 'none';
      onClick.value = false;
    }
  });
}
const removeAnswerImage = (index: number) => {
  const answerContain = document.querySelectorAll('.answer-option-container') as NodeListOf<HTMLElement>;
  const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
  const actionButton = document.querySelectorAll('.add-img-btn') as NodeListOf<HTMLElement>;
  const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
  const removeBtn = document.querySelectorAll('.remove-btn') as NodeListOf<HTMLElement>;
  const answerText = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
  answerOption.forEach((answer, i) => {
    if (i === index && answer.innerText !== '') {
      answer.innerText = '';
      answerContain[i].style.backgroundColor = 'white';
      actionButton[i].style.display = 'block';
      radioBtn[i].style.display = 'none';
      removeBtn[i].style.display = 'none';
      answerText[i].innerText = 'Add answer ' + (i + 1);
    }
  });
}
</script>

<template>
  <div v-if="questionType['0'] ==='Multiple choice'"
       class="answer-options w-full flex  flex-[4_1_0%] flex-wrap h-full content-stretch">
    <div v-for="(item , index) in 4" :key="index"
         :class="`answer-option-${index}`"
         ref="cardAnswers"
         class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5">
      <div class="answer-option-sign" ref="sign">
        <span class=" sign-icon inline-block align-middle w-10 h-10 "/>
      </div>
      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="2xl" class="text-white absolute left-3.5 top-1/2"/>
      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">
        <div class="ans-contain  w-full h-full">
          <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable(index)"
               @blur="setStatus(index)">
            <p class="answer-option-text text-black caret-white relative w-full" ref="answerText">Add answer
              {{ index + 1 }}
            </p>
            <span class="limitTime-number  absolute right-1 top-0 rounded-full text-gray "
                  ref="limitCharacterNumber">{{ MAX_CHARACTER }}</span>
          </div>
          <div class=" absolute right-1/3 bottom-1 ">
            <button class=" remove-btn hidden bg-white color-black rounded-2 " @click="removeAnswerImage(index)">
              remove
            </button>
          </div>
        </div>
        <button class=" add-img-btn  " style="display:block" @click="uploadImage(index)">
          <MDBIcon icon="image" size="2xl" class="text-gray-400"/>
        </button>
        <button role="switch"
                aria-checked="false"
                aria-label="Add audio"
                class=" radio-btn add-audio-btn "
                @click="markTrueAnswer(index)"
                style="display:none">
          <span class="icon-tick hidden">
            <MDBIcon icon="check" size="2xl" class="text-white"/>
            </span>
        </button>
      </div>
    </div>
  </div>
  <div v-if="questionType['1'] ==='True or False'"
       class="answer-options w-full flex  flex-[4_1_0%] flex-wrap h-full content-stretch">
    <div v-for="(item , index) in 2" :key="index"
         :class="`answer-option-${index}`"
         ref="cardAnswers"
         class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5">
      <div class="answer-option-sign" ref="sign">
        <span class=" sign-icon inline-block align-middle w-10 h-10 "/>
      </div>
      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="2xl" class="text-white absolute left-3.5 top-1/2"/>
      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">
        <div class="ans-contain  w-full h-full">
          <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable(index)"
               @blur="setStatus(index)">
            <p class="answer-option-text text-black caret-white relative w-full" ref="answerText">Add answer
              {{ index + 1 }}
            </p>
            <span class="limitTime-number  absolute right-1 top-0 rounded-full text-gray "
                  ref="limitCharacterNumber">{{ MAX_CHARACTER }}</span>
          </div>
          <div class=" absolute right-1/3 bottom-1 ">
            <button class=" remove-btn hidden bg-white color-black rounded-2 " @click="removeAnswerImage(index)">
              remove
            </button>
          </div>
        </div>
        <button class=" add-img-btn  " style="display:block" @click="uploadImage(index)">
          <MDBIcon icon="image" size="2xl" class="text-gray-400"/>
        </button>
        <button role="switch"
                aria-checked="false"
                aria-label="Add audio"
                class=" radio-btn add-audio-btn "
                @click="markTrueAnswer(index)"
                style="display:none">
          <span class="icon-tick hidden">
            <MDBIcon icon="check" size="2xl" class="text-white"/>
            </span>
        </button>
      </div>
    </div>
  </div>
  <div v-if="questionType['2'] ==='Type Answer'"
       class="answer-options w-full flex  flex-[4_1_0%] flex-wrap h-full content-stretch">
    <div v-for="(item , index) in 4" :key="index"
         :class="`answer-option-${index}`"
         ref="cardAnswers"
         class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5">
      <div class="answer-option-sign" ref="sign">
        <span class=" sign-icon inline-block align-middle w-10 h-10 "/>
      </div>
      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="2xl" class="text-white absolute left-3.5 top-1/2"/>
      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">
        <div class="ans-contain  w-full h-full">
          <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable(index)"
               @blur="setStatus(index)">
            <p class="answer-option-text text-black caret-white relative w-full" ref="answerText">Add answer
              {{ index + 1 }}
            </p>
            <span class="limitTime-number  absolute right-1 top-0 rounded-full text-gray "
                  ref="limitCharacterNumber">{{ MAX_CHARACTER }}</span>
          </div>
          <div class=" absolute right-1/3 bottom-1 ">
            <button class=" remove-btn hidden bg-white color-black rounded-2 " @click="removeAnswerImage(index)">
              remove
            </button>
          </div>
        </div>
        <button class=" add-img-btn  " style="display:block" @click="uploadImage(index)">
          <MDBIcon icon="image" size="2xl" class="text-gray-400"/>
        </button>
        <button role="switch"
                aria-checked="false"
                aria-label="Add audio"
                class=" radio-btn add-audio-btn "
                @click="markTrueAnswer(index)"
                style="display:none">
          <span class="icon-tick hidden">
            <MDBIcon icon="check" size="2xl" class="text-white"/>
            </span>
        </button>
      </div>
    </div>
  </div>
  <div v-if="questionType['3'] ==='Puzzle'"
       class="answer-options w-full flex  flex-[4_1_0%] flex-wrap h-full content-stretch">
    <div v-for="(item , index) in 4" :key="index"
         :class="`answer-option-${index}`"
         ref="cardAnswers"
         class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5">
      <div class="answer-option-sign" ref="sign">
        <span class=" sign-icon inline-block align-middle w-10 h-10 "/>
      </div>
      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="2xl" class="text-white absolute left-3.5 top-1/2"/>
      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">
        <div class="ans-contain  w-full h-full">
          <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable(index)"
               @blur="setStatus(index)">
            <p class="answer-option-text text-black caret-white relative w-full" ref="answerText">Add answer
              {{ index + 1 }}
            </p>
            <span class="limitTime-number  absolute right-1 top-0 rounded-full text-gray "
                  ref="limitCharacterNumber">{{ MAX_CHARACTER }}</span>
          </div>
          <div class=" absolute right-1/3 bottom-1 ">
            <button class=" remove-btn hidden bg-white color-black rounded-2 " @click="removeAnswerImage(index)">
              remove
            </button>
          </div>
        </div>
        <button class=" add-img-btn  " style="display:block" @click="uploadImage(index)">
          <MDBIcon icon="image" size="2xl" class="text-gray-400"/>
        </button>
        <button role="switch"
                aria-checked="false"
                aria-label="Add audio"
                class=" radio-btn add-audio-btn "
                @click="markTrueAnswer(index)"
                style="display:none">
          <span class="icon-tick hidden">
            <MDBIcon icon="check" size="2xl" class="text-white"/>
            </span>
        </button>
      </div>
    </div>
  </div>

</template>

<style scoped>
.answer-option-container {
  @apply items-center w-1/2 p-1 relative overflow-visible justify-start flex flex-grow transition-all duration-200 ease-in-out rounded-md h-[7rem] min-h-[2.25rem] max-w-full bg-white text-gray-500 fill-current
}

.answer-option-container {
  box-shadow: rgba(0, 0, 0, 0.15) 0 -0.25rem 0 0 inset;
  width: calc(50% - 3rem);
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

.answer-option-0 .answer-option-sign {
  background-color: rgb(226, 27, 60);
}

.answer-option-1 .answer-option-sign {
  background-color: rgb(19, 104, 206);
}

.answer-option-2 .answer-option-sign {
  background-color: rgb(0, 128, 0);
}

.answer-option-3 .answer-option-sign {
  background-color: rgb(216, 158, 0);
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

.add-img-btn {
  flex: 0 0 auto;
  background: transparent;
  margin: 0 0.5rem;
  position: relative;
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;


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

.remove-btn {
  width: initial;
  margin: 0;
  border: 0;
  cursor: pointer;
  vertical-align: bottom;
  background: rgb(255, 255, 255);
  color: rgb(51, 51, 51);
  border-radius: 4px;
  font-family: Montserrat, "Noto Sans Arabic", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  min-width: 32px;
  min-height: 32px;
  height: 32px;
  padding: 0 8px 4px;
  line-height: 32px;
}

</style>