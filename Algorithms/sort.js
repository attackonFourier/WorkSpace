/**
 * Created by cloud.wong
 */
/**
 * @method 直接插入排序
 */
function directInsertSort(arr){
    for(var i=1;i<arr.length;i++){
        if(arr[i]<arr[i-1]){
            temp=arr[i];//替换哨兵元素
            for(var j=i-1;j>=0 && arr[j]> temp;j--){//在有序区查找插入位置
                arr[j+1]=arr[j];
            }
            arr[j+1]=temp;
        }
    }
}