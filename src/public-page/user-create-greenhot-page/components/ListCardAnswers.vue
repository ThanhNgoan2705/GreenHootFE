<script setup lang="ts">

import {nextTick, onMounted, ref} from 'vue';
import {MDBIcon} from 'mdb-vue-ui-kit';
import {answerCards} from "@/stores/answerCards";

const store = answerCards();
const props = defineProps({
  questionType: String,
})
const onClick = ref(false);
let answerText = ref<HTMLElement | null>(null);
const savedAnswer = store.answerCards.map((item) => item.text);
const limitCharacterNumber = ref(80);
const symbol = ref({
  0: 'heart',
  1: 'square-full',
  2: 'circle',
  3: 'star'
})

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
      if (i === index && answer.innerText !== '' && answer.innerText !== ' Add your answer' + (i + 1)) {
        answer.innerText = store.answerCards[i]?.answerText; // Update with answerText
        savedAnswer[i] = store.answerCards[i]?.answerText; // Update with answerText
        answer.contentEditable = 'true';
        limitNumber[i].style.display = 'block';
      }
      if (i === index && answer.innerText === '') {
        answer.innerText = 'Add your answer ' + (i + 1);
        answer.contentEditable = 'false';
        savedAnswer[i] = answer.innerText;
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
          const wrappImage = document.querySelectorAll('.answer-option-edit') as NodeListOf<HTMLElement>;
          const actionButton = document.querySelectorAll('.add-img-btn') as NodeListOf<HTMLElement>;
          const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
          const removeBtn = document.querySelectorAll('.remove-btn') as NodeListOf<HTMLElement>;
          const answerText = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
          answerOption.forEach((answer, i) => {
            const img = document.createElement('img');
            if (i === index) {
              answer.innerText = '';
              answerContainer[i].style.backgroundColor = 'white';
              actionButton[i].style.display = 'none';
              radioBtn[i].style.display = 'block';
              removeBtn[i].style.display = 'block';
              answerText[i].innerText = '';
              wrappImage[i].style.backgroundImage = `url(${(e.target as FileReader).result})`;
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
}
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
onMounted(() => {
  removeImageOnLoad();
});

const removeImageOnLoad = () => {
  const removeBtn = document.querySelectorAll('.remove-btn') as NodeListOf<HTMLElement>;
  const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
  const actionButton = document.querySelectorAll('.add-img-btn') as NodeListOf<HTMLElement>;
  removeBtn.forEach((button, index) => {
    button.addEventListener('click', () => {
      store.removeAnswerImage(index);
      const answerOption = document.querySelector(`.answer-option-edit`) as HTMLElement;
      if (answerOption) {
        answerOption.style.backgroundImage = '';
        removeBtn[index].style.display = 'none';
        radioBtn[index].style.display = 'none';
        actionButton[index].style.display = 'block';
      }
    });
  });
}
</script>

<template>
  <div v-if="questionType ==='Multiple choice'"
       class="answer-options w-full flex  flex-[4_1_0%] flex-wrap h-full content-stretch">
    <div v-for="(item , index) in store.answerCards" :key="item.id"
         :class="`answer-option-${index}`"
         ref="cardAnswers"
         class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5"
         :style="{backgroundColor: store.changeBgColor(index)}"
    >
      <div class="answer-option-sign" ref="sign">
        <span class=" sign-icon inline-block align-middle w-10 h-10 "/>
      </div>
      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="2xl" class="text-white absolute left-3.5 top-1/2"/>
      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">
        <div class="ans-contain  w-full h-full">
          <div class="answer-option-edit whitespace-pre-wrap break-words box-border"
               @click="store.makeEditable(index)"
               @blur="setStatus(index)">
            <p class="answer-option-text relative w-full"
               :contenteditable="store.answerCards[index].isEditable"
               v-on:input="store.addAnswerText(index, ($event.target as HTMLElement).innerText)"
            >{{ store.answerCards[index].text }}</p>
            <span class="limitTime-number  absolute right-1 top-0 rounded-full text-gray "
                  ref="limitCharacterNumber">{{ MAX_CHARACTER }}</span>
          </div>
          <div class="absolute right-1/3 bottom-1 ">
            <button class="remove-btn hidden bg-white" @blur="setStatus(index)">
              remove
            </button>
          </div>
        </div>
        <button
            class=" add-img-btn  "
            style="display:block"
            :style="{display : store.answerCards[index].answerText.length>0?'none' : 'block'}"
            @click="uploadImage(index)">
          <MDBIcon icon="image" size="2xl" class="text-gray-400"/>
        </button>
        <button role="switch"
                aria-checked="false"
                aria-label="Add audio"
                class=" radio-btn add-audio-btn "
                @click="markTrueAnswer(index)"
                :style="{display : store.answerCards[index].answerText.length>0?'block' : 'none'}">
          <span class="icon-tick hidden">
            <MDBIcon icon="check" size="2xl" class="text-white"/>
            </span>
        </button>
      </div>
    </div>
  </div>
  <!--  <div v-if="questionType ==='True or False'"-->
  <!--       class="answer-options w-full flex  flex-[4_1_0%] flex-wrap h-full content-stretch">-->
  <!--    <div v-for="(item , index) in 2" :key="index"-->
  <!--         :class="`answer-option-${index}`"-->
  <!--         ref="cardAnswers"-->
  <!--         class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5">-->
  <!--      <div class="answer-option-sign" ref="sign">-->
  <!--        <span class=" sign-icon inline-block align-middle w-10 h-10 "/>-->
  <!--      </div>-->
  <!--      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="2xl" class="text-white absolute left-3.5 top-1/2"/>-->
  <!--      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">-->
  <!--        <div class="ans-contain  w-full h-full">-->
  <!--          <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable(index)"-->
  <!--               @blur="setStatus(index)">-->
  <!--            <p class="answer-option-text text-black caret-white relative w-full" ref="answerText">Add answer-->
  <!--              {{ index + 1 }}-->
  <!--            </p>-->
  <!--            <span class="limitTime-number  absolute right-1 top-0 rounded-full text-gray "-->
  <!--                  ref="limitCharacterNumber">{{ MAX_CHARACTER }}</span>-->
  <!--          </div>-->
  <!--          <div class=" absolute right-1/3 bottom-1 ">-->
  <!--            <button class=" remove-btn hidden bg-white color-black rounded-2 " @click="removeAnswerImage(index)">-->
  <!--              remove-->
  <!--            </button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <button class=" add-img-btn  " style="display:block" @click="uploadImage(index)">-->
  <!--          <MDBIcon icon="image" size="2xl" class="text-gray-400"/>-->
  <!--        </button>-->
  <!--        <button role="switch"-->
  <!--                aria-checked="false"-->
  <!--                aria-label="Add audio"-->
  <!--                class=" radio-btn add-audio-btn "-->
  <!--                @click="markTrueAnswer(index)"-->
  <!--                style="display:none">-->
  <!--          <span class="icon-tick hidden">-->
  <!--            <MDBIcon icon="check" size="2xl" class="text-white"/>-->
  <!--            </span>-->
  <!--        </button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  <div v-if="questionType ==='Type Answer'"-->
  <!--       class="answer-options w-full flex  flex-[4_1_0%] flex-wrap h-full content-stretch">-->
  <!--    <div v-for="(item , index) in 4" :key="index"-->
  <!--         :class="`answer-option-${index}`"-->
  <!--         ref="cardAnswers"-->
  <!--         class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5">-->
  <!--      <div class="answer-option-sign" ref="sign">-->
  <!--        <span class=" sign-icon inline-block align-middle w-10 h-10 "/>-->
  <!--      </div>-->
  <!--      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="2xl" class="text-white absolute left-3.5 top-1/2"/>-->
  <!--      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">-->
  <!--        <div class="ans-contain  w-full h-full">-->
  <!--          <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable(index)"-->
  <!--               @blur="setStatus(index)">-->
  <!--            <p class="answer-option-text text-black caret-white relative w-full" ref="answerText">Add answer-->
  <!--              {{ index + 1 }}-->
  <!--            </p>-->
  <!--            <span class="limitTime-number  absolute right-1 top-0 rounded-full text-gray "-->
  <!--                  ref="limitCharacterNumber">{{ MAX_CHARACTER }}</span>-->
  <!--          </div>-->
  <!--          <div class=" absolute right-1/3 bottom-1 ">-->
  <!--            <button class=" remove-btn hidden bg-white color-black rounded-2 " @click="removeAnswerImage(index)">-->
  <!--              remove-->
  <!--            </button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <button class=" add-img-btn  " style="display:block" @click="uploadImage(index)">-->
  <!--          <MDBIcon icon="image" size="2xl" class="text-gray-400"/>-->
  <!--        </button>-->
  <!--        <button role="switch"-->
  <!--                aria-checked="false"-->
  <!--                aria-label="Add audio"-->
  <!--                class=" radio-btn add-audio-btn "-->
  <!--                @click="markTrueAnswer(index)"-->
  <!--                style="display:none">-->
  <!--          <span class="icon-tick hidden">-->
  <!--            <MDBIcon icon="check" size="2xl" class="text-white"/>-->
  <!--            </span>-->
  <!--        </button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  <div v-if="questionType ==='Puzzle'"-->
  <!--       class="answer-options w-full flex  flex-[4_1_0%] flex-wrap h-full content-stretch">-->
  <!--    <div v-for="(item , index) in 4" :key="index"-->
  <!--         :class="`answer-option-${index}`"-->
  <!--         ref="cardAnswers"-->
  <!--         class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5">-->
  <!--      <div class="answer-option-sign" ref="sign">-->
  <!--        <span class=" sign-icon inline-block align-middle w-10 h-10 "/>-->
  <!--      </div>-->
  <!--      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="2xl" class="text-white absolute left-3.5 top-1/2"/>-->
  <!--      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">-->
  <!--        <div class="ans-contain  w-full h-full">-->
  <!--          <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable(index)"-->
  <!--               @blur="setStatus(index)">-->
  <!--            <p class="answer-option-text text-black caret-white relative w-full" ref="answerText">Add answer-->
  <!--              {{ index + 1 }}-->
  <!--            </p>-->
  <!--            <span class="limitTime-number  absolute right-1 top-0 rounded-full text-gray "-->
  <!--                  ref="limitCharacterNumber">{{ MAX_CHARACTER }}</span>-->
  <!--          </div>-->
  <!--          <div class=" absolute right-1/3 bottom-1 ">-->
  <!--            <button class=" remove-btn hidden bg-white color-black rounded-2 " @click="removeAnswerImage(index)">-->
  <!--              remove-->
  <!--            </button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <button class=" add-img-btn  " style="display:block" @click="uploadImage(index)">-->
  <!--          <MDBIcon icon="image" size="2xl" class="text-gray-400"/>-->
  <!--        </button>-->
  <!--        <button role="switch"-->
  <!--                aria-checked="false"-->
  <!--                aria-label="Add audio"-->
  <!--                class=" radio-btn add-audio-btn "-->
  <!--                @click="markTrueAnswer(index)"-->
  <!--                style="display:none">-->
  <!--          <span class="icon-tick hidden">-->
  <!--            <MDBIcon icon="check" size="2xl" class="text-white"/>-->
  <!--            </span>-->
  <!--        </button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

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

.answer-option-text:focus {
  @apply outline-none border-none text-lg text-black caret-black
}

.answer-option-text[contenteditable="true"] {
  @apply text-white caret-white
}
.answer-option-text[contenteditable="false"] {
  @apply text-black caret-black
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