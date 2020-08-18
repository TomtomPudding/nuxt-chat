<template>
    <a-layout-sider :style="{ height: '100vh', right: 0}" class="right-bar" >
        <a-layout-header class="sub-header header-right">
          <div class="icon">
            Member
            <a-button shape="circle" icon="close" />
          </div>
        </a-layout-header>
        <div>
          <a-card size="small" class="bar-card">
            Tom
          </a-card>
          <a-card size="small" class="bar-card">
            Tom
          </a-card>
        </div>
    </a-layout-sider>
</template>
<style lang="scss">
.right-bar {
  border-left: 1px solid #666666;
  .sub-header {
    max-width: 100%;
    padding-right: 10px;
    padding-left: 10px;
    border-bottom: 1px solid #666666;
  }
  .sub-header .icon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    height: 100%;
  }
  .bar-card {
    background-color: #001529;
    color: #e8e8e8;
    cursor: pointer;
    &:hover {
      background-color: #e8e8e8;
      color: #001529;
    }
  }
  .ant-card-bordered {
      border: 1px solid #001529;
  }
  .icon {
    color: #e8e8e8;
  }
}
</style>
