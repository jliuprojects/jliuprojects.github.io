<?php snippet( 'header') ?>

<div class="vince">
    <span class="spaceyspan">blur: <input type="checkbox" id="cb_blur" /></span>
    <span class="spaceyspan">wireframe: <input type="checkbox" id="cb_wireframe" /></span>
    <span class="spaceyspan">subdiv factor: <select id="sb_subdiv_factor">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option selected value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="100">100</option>
          <option value="1e6">1e6</option>
        </select>
      </span>
    <span class="spaceyspan">(optional) non-adaptive depth: <select id="sb_nonadaptive_depth">
          <option selected value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </span>
    <span class="spaceyspan">fps: <span id="fps">-</span></span>
    <span class="spaceyspan">tris drawn: <span id="tri_count">-</span></span>
</div>

<div class="glenn">
    Kid.
</div>

<ul class="bxslider">
  <li class="slide"><canvas id="canvas1" width="1000" height="700"></canvas>aaa</li>
  <li class="slide"><canvas id="canvas1" width="1000" height="700"></canvas></li>
  <li class="slide"><canvas id="canvas1" width="1000" height="700"></canvas></li>
  <li class="slide"><canvas id="canvas1" width="1000" height="700"></canvas></li>
</ul>



<?php snippet( 'footer') ?>