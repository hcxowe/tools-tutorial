<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	* {
		box-sizing: border-box;
	}

	html, body {
		width: 100%;
		height: 100%;
		font-family: '微软雅黑', sans-serif;
		overflow: hidden;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		text-align: center;
		color: #2c3e50;
		width: 100%;
		height: 100%;
	}
</style>
