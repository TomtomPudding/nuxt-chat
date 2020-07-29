<template>
    <a-layout-sider theme="light" :style="{ height: '100vh', right: 0}" class="right-bar" >
        <a-layout-header class="sub-header header-right">
          <div class="icon">
            Member
            <a-button shape="circle" icon="close" />
          </div>
        </a-layout-header>
        <div class="overflow: auto; height: 100%">
          <a-card size="small">
            Tom
          </a-card>
          <a-card size="small">
            Tom
          </a-card>
        </div>
    </a-layout-sider>
</template>
<style>
.sub-header {
  background: #fff;
  max-width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  border-bottom: 1px solid #e8e8e8;
}
.sub-header .icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.right-bar {
  border-left: 1px solid #e8e8e8;
}
</style>
