<template>
  <ul>
    <li>
      <div class="time">
        <div class="date">
          <div class="month-day">{{article.monthDay}}</div>
          <div class="year">{{article.year}}</div>
        </div>
        <div class="point"></div>
        <div class="clearfix"></div>
      </div>
      <div class="describe">
        <div class="article">
          <h2>
            {{title}}
          </h2>
          <div class="content">
            <router-link class='artical-img' :to="`/youthfighter/article/${article._id}`">
              <img src="../../assets/image/t03.jpg" width="200" height="170">
            </router-link>  
            <p>{{article.content}}
            </p>       
            <router-link class='more' :to="`/youthfighter/article/${article._id}`">
              <Button type="success">查看更多>></Button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['article']
}
</script>
<style scoped>
ul li{
  height: 250px;
}
img{
  height: 170px;
  width: 200px;
  overflow: hidden;
}
.time{
  position: relative;
  width: 300px;
  float: left;
  color: #fff;
  border-right: 5px solid #fff;
  height: 250px;
}
li:hover .date{
  background-color: #fff;
}
.describe{
  width: 860px;
  float: left;
  height: 250px;
}
.date{
  width: 130px;
  float: right;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -o-transition: all 1s;
  opacity: 0.5;
}
.month-day{
  font-size: 18px;
  line-height: 25px;
  color: #bdd0db;
  text-align: right;
  padding-right: 20px;
}
.year{
  font-size: 26px;
  line-height: 32px;
  color: #6cbfee;
  text-align: right;
  padding-right: 20px;
}
.point{
  position: absolute;
  width: 10px;
  height: 10px;
  right: -7px;
  top: 20px;
  background-color: #46a4da;
  box-shadow: 0 0 0 3px #afdcf8;
  border-radius: 50%;
}
.article{
  color: #fff;
  background: #579dc5;
  margin: 0 30px 15px;
  height: 235px;
  border-radius: 5px;
  position: relative;
  padding: 20px;
}
.article:after{
  right: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-width: 10px;
  top: 20px;
  border-right-color: #579dc5;
}
.artical-img{
  display: block;
  height: 150px;
  width: 200px;
  overflow: hidden;
  position: absolute;
  top: 60px;
}
.content p{
  margin-top: 10px;
  font-size: 18px;
  padding-left: 210px;
  height: 120px;
  padding: 0 10px 0 230px;
  line-height: 30px;
  overflow: hidden;
}
.more{
  display: block;
}
.more button{
  float: right;
  margin-top: 5px;
}
</style>