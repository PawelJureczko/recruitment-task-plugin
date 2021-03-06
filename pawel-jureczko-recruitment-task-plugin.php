<?php

/**
 * @package pawel-jureczko-recruitment-task-plugin
 */

 /*
  Plugin Name: Pawel Jureczko Recruitment Task Plugin
  Plugin URI: https://github.com/PawelJureczko/recruitment-task-plugin
  Description: ToDo List created as task for Web Wolf recruitment
  Version: 1.0.0
  Author: Pawel Jureczko
  Author URI: https://www.linkedin.com/in/pawe%C5%82-jureczko-35a267191/
  License: GPLv2 or later
  */


// prevents interference without permission
  if ( ! defined( 'ABSPATH' ) ) {
    die;
  }

//adding custom css for plugin
function addThemeStyles() {
  wp_enqueue_style('style_file' , plugin_dir_url(__FILE__).'/css/plugin_styles.css');
}

//adding bootstrap css cdn
function todoPJ_enqueueBootstrapCSS()
{
    wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
    wp_enqueue_style('prefix_bootstrap');
}

//adds script file and put it on footer (true - last parameter)
function addThemeScript() {
  wp_enqueue_script('js-file', plugin_dir_url(__FILE__).'/js/plugin_pj_script.js', '', '1.0.0', true);
}

//assign google fonts to variable
function addGoogleFont() {
  $googleFont = '<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Reggae+One&display=swap" rel="stylesheet">';
  echo $googleFont;
}


//main function which returns html with todolist
function mainToDoList() {
  return '
  <div class="todolist">
    <div class="container pt-3">
      <div class="row">
        <div class="col-12 text-center">
          <h2>ToDoList</h2>
          <form autocomplete="off" class="d-flex flex-column flex-xl-row justify-content-between align-items-center px-xl-5">
            <label for="task" class="d-flex justify-content-center align-items-center">Add new task:</label>
            <input type="text" name="task" class="mt-5 mt-md-0" id="task" value="" placeholder="Enter task here">
            <input type="submit" class="btn-submit mt-3 mt-xl-0" value="submit">
          </form>
          <span class="alert d-none">Task can not be empty, Sir!</span>
        </div>
        <div class="col-12 my-5">
          <ul class="todolist__list px-xl-5">

          </ul>
        </div>
      </div>
    </div>
  </div>';
}

// functions which triggers functions from above
add_action('wp_enqueue_scripts', 'addThemeStyles');
add_action('wp_enqueue_scripts', 'addThemeScript');
add_action('wp_head', 'todoPJ_enqueueBootstrapCSS');
add_action('wp_head', 'addGoogleFont');

add_shortcode('pj-todolist-plugin', 'mainToDoList');
