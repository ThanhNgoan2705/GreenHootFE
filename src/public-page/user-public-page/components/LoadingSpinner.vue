<script setup lang="ts">

</script>
<template>
    
    <div class="loading-spinner">
        <div class="spinner"></div>
    </div>
</template>

<style>
.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: #333;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>