<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">要求指派</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div class="modal-body">
                    <h1 class="mb-4">项目名称-参数</h1>

<label class="text-border">人员</label>
<select class="form-select" style="width:240px">
<option selected >指派人员</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>

<label class="text-border">设备</label>
<select class="form-select" style="width:240px">
<option selected ></option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>

<label class="text-border">样品</label>
<select class="form-select" style="width:240px">
<option selected ></option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>

<label class="text-border">方法</label>
<select class="form-select" style="width:240px">
<option selected ></option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>

<label class="text-border">设施</label>
<select class="form-select" style="width:240px">
<option selected ></option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>

<label class="text-border">比对验证</label>
<select class="form-select" style="width:240px">
<option selected ></option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>

<label class="text-border">模式实验</label>
<select class="form-select" style="width:240px">
<option selected ></option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>

                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary">确认</button>
                </div>
                </div>
                </div>
                </div>
</template>

<script>
export default {
    name: "Modal_e",
}
</script>

<style scoped>

</style>