/**
  *@method 快速排序
  */
function Partition(arr,left,right){
    var key = arr[left];
    while(left < right){
        while(left < right && arr[right] >= key){
            right--;
        }
        if(left < right){
            arr[left] = arr[right];
            left++;
        }
        while(left<right && arr[left]<= key){
            left++;
        }
        if(left<right){
            arr[right]=arr[left];
            right--;
        }
    }
    arr[left] = key;
    return left;
}

function QuickSort(arr,low,high){
    var index;
    if(low<high){
        index = Partition(arr,low,high);
        QuickSort(arr,low,index-1);
        QuickSort(arr,low+1,high);
    }
}