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

function todoPJ_enqueueBootstrapCSS()
{
    wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
    wp_enqueue_style('prefix_bootstrap');
}

function addThemeScript() {
  wp_enqueue_script('js-file', plugin_dir_url(__FILE__).'/js/plugin_pj_script.js', '', '1.0.0', true);
}

function addGoogleFont() {
  $googleFont = '<link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Reggae+One&display=swap" rel="stylesheet">';
  echo $googleFont;

//font-family: 'Reggae One', cursive;
}

function mainToDoList() {
  return '
  <div class="todolist">
    <div class="container pt-3">
      <div class="row">
        <div class="col-12 text-center">
          <h1>ToDoList</h1>
          <form class="d-flex">
            <label for="task">Add new task:</label>
              <input type="text" name="task" id="task" value="" placeholder="Enter task here">
              <input type="submit" value="submit">
          </form>
        </div>
        <div class="col-12">
          <ul class="todolist__list">
            <li>first task </li>
            <li>second task</li>
            <li>third task</li>
          </ul>
        </div>
      </div>
    </div>
  </div>';
}


add_action('wp_enqueue_scripts', 'addThemeStyles');
add_action('wp_enqueue_scripts', 'addThemeScript');
add_action('wp_head', 'todoPJ_enqueueBootstrapCSS');
add_action('wp_head', 'addGoogleFont');

add_shortcode('example', 'mainToDoList');
