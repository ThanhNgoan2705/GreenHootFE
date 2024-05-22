<script setup lang="ts">

import {MDBIcon} from "mdb-vue-ui-kit";
import {ref} from "vue";
const props =defineProps({
  id: {
    type:Number,
    required:true,
    default:0
  },
  qsContent: Boolean,
  qsImage: String,
  savedText: String,
  questionCount: Number,
  isActive: Boolean
})
const emit = defineEmits(['deleteQuestion','increment','setActiveQuestionDemo'])
const increment = () => {
  emit('increment')
}
const deleteQuestion = () => {
  emit('deleteQuestion', props.id)
}
const setActiveQuestionDemo = (id: number) => {
  emit('setActiveQuestionDemo', id);

}
</script>
<template>
  <div class="question-demo" @click="setActiveQuestionDemo(props.id)">
    <div class="sidebar-block"
         aria-label="question block">
      <div class="qs-demo-title">
        <div class="qs-number  text-sm fw-normal text-gray-500 w-1.5 text-right ms-4">{{props.id}}</div>
        <div class="qs text-sm text-center ms-3">Quiz</div>
      </div>
      <div class="qs-content">
        <div class="sidebar-block-gh justify-center " tabindex="0" role="button" aria-describedby="hidden-text"
             draggable="false">
          <div class="sidebar-block-content">
            <div class="style-qs-demo">
              <div class="qs-title  text-center font-medium mt-2">
                      <span>
                        <span class="text-sm ">{{ qsContent ? savedText : 'Question' }}</span>
                      </span>
              </div>
              <div class=" my-auto mx-0 flex justify-center relative ">
                <div
                    class="qs-countdown block absolute top-1/2 left-0 w-6 h-6 border border-black rounded-full  text-center -translate-y-1/2  ">
                  20
                </div>
                <div class=" flex content-center items-center overflow-hidden ">
                  <div
                      class="img-center flex w-8 h-6 justify-center items-center relative overflow-hidden border-2 border-dashed border-gray-400 text-gray-400">
                    <div class="icon-image flex z-50">
                      <MDBIcon v-if="!qsImage" icon="image" size="lg"/>
                      <img v-else :src="qsImage" alt="image" class="w-full h-full"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="answer-selector">
                <div class="answer-option  "/>
                <div class="answer-option  "/>
                <div class="answer-option  "/>
                <div class="answer-option "/>
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar-block-action visible flex flex-col justify-end self-end pe-0.5 ms-2">
                <span>
                  <span>
                    <button aria-label="duplicate" tabindex="0"
                            class=" p-0 border-0 w-auto bg-none rounded-sm cursor-pointer mt-2">
                      <span class="icon-dupli">
                        <MDBIcon icon="clone" size="sm"/>
                      </span>
                    </button>
                  </span>
                  <span>
                    <button aria-label="delete" tabindex="0" @click="deleteQuestion"
                            class=" p-0 border-0 w-auto bg-none rounded-sm cursor-pointe mt-3 mb-1">
                      <span class="icon-delete inline-block ">
                        <MDBIcon icon="trash-alt" size="sm"/>
                      </span>
                    </button>
                  </span>
                </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.question-demo {
  @apply w-full outline-0 opacity-[1]
}

.sidebar-block {
  height: 100%;
  background-color: rgb(234, 244, 252);
  user-select: none;
  padding: 12px 16px 12px 0;
  display: block;
}

.sidebar-block-content {
  height: 93px;
  width: calc(100% - 26px);
  background-color: rgb(255, 255, 255);
  border-radius: 0.25rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1 0 auto;
  box-shadow: transparent 0px 0px 0px 3px;
  max-width: calc(100% - 26px);
  margin-left: 0px;
}
.style-qs-demo{
  @apply flex flex-col justify-center h-full w-full max-w-full flex-1 px-[0.5rem] py-[0.25rem] text-gray-400
}

.qs-demo-title {
  display: flex;
  flex: 0 1 auto;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.qs-content {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  flex: 1 1 0;
  height: calc(100% - 3rem);
}

.answer-selector {
  @apply flex flex-wrap mt-[3px]
}

.answer-option {
  @apply relative w-[calc(50%-0.125rem)] h-[7px] mb-[3px] border-[1px] border-solid border-gray-400 rounded-[0.125rem]
}

</style>