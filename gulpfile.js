var gulp = require('gulp'),
    initGulpTasks = require('react-component-gulp-tasks');

var taskConfig = {

	component: {
		name: 'Ppa4sim',
		less: 'less/default.less'
	},

	example: {
		src: 'src',
		dist: 'dist',
		files: [
			'index.html',
			'.gitignore'
		],
		scripts: [
			'app.js'
		],
		less: [
			'app.less'
		]
	}

};

initGulpTasks(gulp, taskConfig);
