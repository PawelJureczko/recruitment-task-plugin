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
    // CSS
    wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
    wp_enqueue_style('prefix_bootstrap');
}

function addThemeScript() {

  wp_enqueue_script('js-file', plugin_dir_url(__FILE__).'/js/plugin_pj_script.js', '', '1.0.0', true);
}

function mainToDoList() {
  return '
  <div class="another-test-file" id="only-for-test">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h1>Hello World!</h1>
        </div>
        <div class="col-6">
          <h1>Another Hello World!</h1>
          <button class="btn btn--testowo">asdasd</button>
        </div>
      </div>
    </div>
  </div>';
}


add_action('wp_enqueue_scripts', 'addThemeStyles');
add_action('wp_enqueue_scripts', 'addThemeScript');
add_action('wp_head', 'todoPJ_enqueueBootstrapCSS');

add_shortcode('example', 'mainToDoList');