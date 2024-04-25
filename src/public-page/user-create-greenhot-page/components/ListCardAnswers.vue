<script setup>

import {nextTick, onMounted, ref} from 'vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

const onClick = ref(false);
const hasContent = ref(false);
const answerText = ref(null);
const savedAnswer = ref('')
const limitCharacterNumber = ref(80)


const makeEditable = (index) => {
  const answerOption = document.querySelectorAll('.answer-option-text');
  const limitNumber = document.querySelectorAll('.limitTime-number');
  answerOption.forEach((answer, i) => {
    const text = answer.innerText;
    if (i === index && answer.innerText === 'Add answer ' + (index + 1)) {
      answer.innerText = '';
      answerText.value = answer;
      answerText.value.contentEditable = true;
      // limitNumber[index].style.display = 'block';
      answerText.value.focus();
    }
    else if (i !== index && answer.innerText === '') {
      answer.innerText = 'Add answer ' + (i + 1);
      answerText.value.contentEditable = false;
      // limitNumber[i].style.display = 'none';
    }
  });
}
const setLimitedCharacter = () => {
  const answer = document.getElementsByClassName("answer-option-text");
  while (limitCharacterNumber.value < 100) {
    if (answer.length > 0) {
      limitCharacterNumber.value--;
    }
  }
}
const setStatus = (index) => {
  onClick.value = false;
  nextTick(() => {
    const answerOption = document.querySelectorAll('.answer-option-text');
    const limitNumber = document.querySelectorAll('.limitTime-number');

    answerOption.forEach((answer, i) => {
      if (i !== index && answer.innerText === '') {
        answer.innerText = 'Add answer ' + (i + 1);
        answerText.value.contentEditable = false;
        // limitNumber[index].style.display = 'none';
      }
    });
  });
}
onMounted(() => {
  document.addEventListener('click', (event) => {
    const cardAnswers = document.querySelectorAll('.answer-option-container');
    if (!Array.from(cardAnswers).some(cardAnswer => cardAnswer.contains(event.target))) {
      setStatus();
    }
  });
});
const changeBgColorOnInput = (index) => {
  const answerOption = document.querySelectorAll('.answer-option-text');
  const answerContainer = document.querySelectorAll('.answer-option-container');
  console.log(answerOption.length)
 const color = ['rgb(226,27,60)', 'rgb(19,104,206)', 'rgb(0,128,0)', 'rgb(216, 158, 0)'];
  answerOption.forEach((answer, i) => {
    if (i === index && answer.innerText !== '') {
      answerContainer[i].style.backgroundColor = color[i];
    }else if (i === index && answer.innerText === '') {
      answerContainer[i].style.backgroundColor = 'white';
    }
  });
}
onMounted(() => {
  const answerOption = document.querySelectorAll('.answer-option-text');
  answerOption.forEach((answer, index) => {
    answer.addEventListener('input', () => {
      changeBgColorOnInput(index);
    });
  });
});


</script>

<template>
  <div class="answer-options w-full flex  flex-[4_1_0%] flex-wrap h-full content-stretch">
    <div v-for="(item , index) in 4" key="index"
         :class="`answer-option-${index}`"
         ref="cardAnswers"
         class="answer-option-container  asw-res py-0.5 px-0.5 my-0.5 mx-0.5">
      <div class="answer-option-sign" ref="sign">
<span class=" sign-icon inline-block align-middle w-10 h-10 ">
</span>
      </div>
      <div class=" flex flex-1 items-center content-end w-full relative h-full " style="max-width: calc(100% - 3rem);">
        <div class="ans-contain overflow-auto w-full h-full">
          <div class="answer-option-edit whitespace-pre-wrap break-words box-border" @click="makeEditable(index)"
               @blur="setStatus(index)">
            <p class="answer-option-text text-black caret-white relative w-full" ref="answerText">Add
              answer {{ index + 1 }}</p>
            <span class="limitTime-number   absolute right-1 top-0 rounded-full text-gray "
                  ref="limitCharacterNumber">{{ limitCharacterNumber.value }}</span>
          </div>
        </div>
<!--        <button-->
<!--            class="add-img-btn flex-auto bg-transparent my-0 mx-0.5 w-5 h-5 border border-solid border-white transition ">-->

<!--        </button>-->
        <button role="switch" aria-checked="false" aria-label="Add audio"
            class=" radio-btn add-audio-btn block ">
        </button>


      </div>
    </div>
  </div>
</template>

<style scoped>
.answer-option-container {
  @apply items-center w-1/2 p-1 relative overflow-visible justify-start flex flex-grow transition-all duration-200 ease-in-out rounded-md h-[5rem] min-h-[2.25rem] max-w-full bg-white text-gray-500 fill-current
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

.sign-icon svg {
  fill: white;
}

@media (min-width: 600px)

.asw-res {
  min-height: 4rem;
}

.answer-option-0 .answer-option-sign {
  background-color: rgb(226,27,60);
}

.answer-option-1 .answer-option-sign {
  background-color: rgb(19,104,206);
}

.answer-option-2 .answer-option-sign {
  background-color: rgb(0,128,0);
}

.answer-option-3 .answer-option-sign {
  background-color: rgb(216, 158, 0);
}
@keyframes radioAnimation{
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
.add-audio-btn{
  flex: 0 0 auto;
  background: transparent;
  margin: 0 0.5rem;
}
.radio-btn{
  display: inline-block;
  position: relative;
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  background: transparent;
  border: 0.25rem solid rgb(255, 255, 255);
  transition: background 0.2s ease 0s;
  transform-origin: center bottom;
  box-shadow: transparent 0px 0px 0px 0.125rem, rgba(0, 0, 0, 0.35) 0px 0.125rem 0.125rem, rgba(0, 0, 0, 0.35) 0px 0px 0px 0.0625rem;
  animation: radioAnimation 4s infinite;
}

</style>