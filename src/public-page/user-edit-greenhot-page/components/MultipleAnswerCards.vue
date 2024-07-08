<script setup lang="ts">

import { PropType, computed, nextTick, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { MDBIcon } from 'mdb-vue-ui-kit'

import { Choice, Packet, Question, UpdateQuestionRequest } from '@/proto/Proto';
import { WS } from '@/socket/WS';
import { useQuestionStore } from '@/states/QuestionStore';

const onClick = ref(false);
const hasContent = ref(false);
const hasImage = ref(false);
const isTrueAnswer = ref(false);
let savedAnswer = ref<HTMLElement>();
const correctAnswerIndex = ref(null);


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
const makeEditable = (index: number) => {

  const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
  const limitNumber = document.querySelectorAll('.limitTime-number') as NodeListOf<HTMLElement>;
  savedAnswer.value = answerOption[index];
  // Make it editable
  if (answerOption[index].innerText.trim() === 'Enter your answer here' ){
    answerOption[index].style.color = 'black ';
    answerOption[index].innerText = '';
  }
  answerOption[index].contentEditable = 'true';
  answerOption[index].focus();
  limitNumber[index].style.display = 'block';
  // Add event listener for input event
  answerOption[index].addEventListener('input', () => {
    // If the length of the text is greater than 0, change the color to white
    if (answerOption[index].innerText.length > 0 && answerOption[index].innerText.trim() !== '') {
      answerOption[index].style.color = 'white ';
    }
  });
}

const setStatus = (index: number) => {
  onClick.value = false;
  nextTick(() => {
    const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
    const limitNumber = document.querySelectorAll('.limitTime-number') as NodeListOf<HTMLElement>;
    answerOption.forEach((answer, i) => {
      if (i === index && answerTextRefs.value[index]) {
        if (answer.innerText.trim() === '' && hasImage.value === false) {
          answer.innerText = 'Enter your answer here';
          answer.contentEditable = 'false';
          limitNumber[index].style.display = 'none';
        } else if (answer.innerText.trim() !== '') {
          answer.contentEditable = 'false';
          limitNumber[index].style.display = 'none';
        }
      }
    });
  });
}
onMounted(() => {
  document.addEventListener('click', (event) => {
    const cardAnswers = document.querySelectorAll('.answer-option-container');
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
  console.log(answerOption.length)
  answerOption.forEach((answer, i) => {
    if (i === index && answer.innerText !== '') {
      changeBGColor(index);
      actionButton[i].style.display = 'none';
      radioBtn[i].style.display = 'block';
    } else if (i === index && answer.innerText === '') {
      answerContainer[i].style.backgroundColor = 'white';
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
          const wrappImage = document.querySelectorAll('.answer-option-edit') as NodeListOf<HTMLElement>;
          const actionButton = document.querySelectorAll('.add-img-btn') as NodeListOf<HTMLElement>;
          const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
          const removeBtn = document.querySelectorAll('.remove-btn') as NodeListOf<HTMLElement>;
          const answerText = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
          answerOption.forEach((answer, i) => {
            if (i === index) {
              answer.contentEditable = 'false';
              changeBGColor(index);
              actionButton[i].style.display = 'none';
              radioBtn[i].style.display = 'block';
              removeBtn[i].style.display = 'block';
              answerText[i].classList.add('hidden');
              wrappImage[i].style.backgroundImage = `url(${(e.target as FileReader).result})`;
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
    hasImage.value = true;
  };
}

onMounted(() => {
  const answerOption = document.querySelectorAll('.answer-option-text');
  answerOption.forEach((answer, index) => {
    answer.addEventListener('input', () => {
      changeBgColorOnInput(index);
    });
  });
});
const markTrueAnswer = (index: number) => {
  const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
  const iconTick = document.querySelectorAll('.icon-tick') as NodeListOf<HTMLElement>;
  correctAnswerIndex.value = index;
  radioBtn.forEach((radio, i) => {
    if (i === index) {
      radio.style.backgroundColor = 'rgb(102, 191, 57)';
      iconTick[i].style.display = 'block';
      onClick.value = true;
      isTrueAnswer.value = index === correctAnswerIndex.value;
    } else {
      radio.style.backgroundColor = 'transparent';
      iconTick[i].style.display = 'none';
      onClick.value = false;
    }
  });
  return onClick.value;
}
const removeAnswerImage = (index: number) => {
  const answerContain = document.querySelectorAll('.answer-option-container') as NodeListOf<HTMLElement>;
  const answerOption = document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
  const actionButton = document.querySelectorAll('.add-img-btn') as NodeListOf<HTMLElement>;
  const radioBtn = document.querySelectorAll('.radio-btn') as NodeListOf<HTMLElement>;
  const removeBtn = document.querySelectorAll('.remove-btn') as NodeListOf<HTMLElement>;
  const wrappImage = document.querySelectorAll('.answer-option-edit') as NodeListOf<HTMLElement>;
  answerOption.forEach((answer, i) => {
    if (i === index) {
      answer.classList.remove('hidden');
      answerContain[i].style.backgroundColor = 'white';
      actionButton[i].style.display = 'block';
      radioBtn[i].style.display = 'none';
      removeBtn[i].style.display = 'none';
      hasContent.value = false;
      wrappImage[i].style.backgroundImage = 'none';
      hasImage.value = false;
    }
  });
}

const props = defineProps({
  items: {
    type: Object as PropType<Choice[]>,
    required: true,
  },
  questionTitle: {
    type: String,
    required: true
  },
  questionId: {
    type: Number,
    required: true
  },
  questionIndex: {
    type: Number,
    required: true
  }
})
console.log(props.items+ 'items')
console.log(props.questionTitle+ 'questionTitle')
console.log(props.questionId)

const answerTextRefs = ref<HTMLParagraphElement[]>([]);


const setAnswerTextRef = (index: number, el: HTMLParagraphElement) => {
  if (el) {
    answerTextRefs.value[index] = el;
  }
};
const updateAnswerText = (event: InputEvent) => {
  const target = event.target as HTMLParagraphElement;
  const index = answerTextRefs.value.indexOf(target);
  if (index !== -1) {
    answerTextRefs.value[index] = target;
  }
};

const getListAnswerText = () => {
  return document.querySelectorAll('.answer-option-text') as NodeListOf<HTMLElement>;
};


const saveQuestion = (event: Event) => {
  event.preventDefault();
  let question = Question.create();
  const examId = sessionStorage.getItem('examId')as string | '';
  question.questionId = props.questionId;
  question.questionText = props.questionTitle;
  question.examId = parseInt(examId);
  question.questionIndex = props.questionIndex;
  const answers = getListAnswerText();
  question.choices = Array.from(answers).map((answer, index) => {
    let choice = Choice.create();
    choice.choiceText = answer.textContent as string;
    choice.choiceIndex = index + 1;
    choice.isCorrect = correctAnswerIndex.value === index;
    choice.questionId = props.questionId;
    return choice;
  });
  let requestUpdateQuestion = UpdateQuestionRequest.create();
  requestUpdateQuestion.question = question;
  let packet = Packet.create();
  packet.data = { oneofKind: "updateQuestionRequest", updateQuestionRequest: requestUpdateQuestion };
  WS.send(packet);
  sessionStorage.setItem('question', JSON.stringify(question));
}

watch(() => props.items, (newItems) => {
 for (let i = 0; i < newItems.length; i++) {
  console.log(newItems[i].choiceText)
    if (newItems[i].choiceText.trim() !== ''|| newItems[i].choiceText.trim() !== 'Enter your answer here'){
        if(newItems[i].isCorrect){
          markTrueAnswer(i);
          changeBGColor(i);
          changeBgColorOnInput(i);
        }
        changeBGColor(i);
        changeBgColorOnInput(i);
      }
    else {
      hasContent.value = false;
      onClick.value = false;
    }
  }
  
  
},{deep:true});
</script>

<template>
  <div class="answer-options w-full  h-full">
    <div v-for="(item, index) in items" :key="index" :class="`answer-option-${index}`" ref="cardAnswers"
      class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5">
      <div class="answer-option-sign" ref="sign">
        <span class=" sign-icon inline-block align-middle w-10 h-10 " />
      </div>
      <MDBIcon :icon="symbol[index as keyof typeof symbol]" size="xl" class="text-white absolute left-4 top-1/2" />
      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">
        <div class="ans-contain  w-full h-full">
          <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable(index)"
            @blur="setStatus(index)">

            <p class="answer-option-text relative w-full" ref="el => setAnswerTextRef(index, el)"
              @input="updateAnswerText">
              {{ item.choiceText }}
            </p>
            <span class="limitTime-number   absolute right-1 top-0 rounded-full text-gray " ref="limitCharacterNumber">{{
              MAX_CHARACTER }}</span>
          </div>
          <div class=" absolute right-1/3 bottom-1 ">
            <button class=" remove-btn hidden bg-white rounded-2 " @click="removeAnswerImage(index)">
              remove
            </button>
          </div>
        </div>
        <button class="add-img-btn" style="display:block" @click="uploadImage(index)">
          <MDBIcon icon="image" size="2xl" class="text-gray-400" />
        </button>
        <button role="switch" aria-checked="false" aria-label="Add audio" class=" radio-btn add-audio-btn "
          @click="markTrueAnswer(index)" style="display:none">
          <span class="icon-tick hidden">
            <MDBIcon icon="check" size="2xl" class="text-white" />
          </span>
        </button>
      </div>
    </div>
  </div>
  <button class="add-answer-btn m-auto content-center justify-center " @click="saveQuestion">
    Save Question
  </button>
</template>

<style scoped>
.answer-options {
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
}

.answer-option-container {
  @apply items-center p-1 relative overflow-visible justify-start flex flex-grow transition-all duration-200 ease-in-out rounded-md h-[7rem] min-h-[2.25rem] max-w-full bg-white text-gray-500 fill-current
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
  width: calc(100% - 2 * 10px);
  /* Subtracting twice the padding from the width */
  height: calc(100% - 2 * 10px);
  /* Subtracting twice the padding from the height */
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