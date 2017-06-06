var Thecontext={
    type:'FUNCTION',
    name:'myFunc',
    params:[],
    body:ScriptObject
};
ScriptObject={
    type:'SCRIPT',
    varDecls:[],
    funDecls:[],
    source:'...'
};

/**
 * @method 二分查找  recursive
 *
 */
function binarySearch(arr,key,low,high){
    var mid;
    if(low<=high){
        mid= parseInt((low+high)/2,10);
        if(arr[mid] === key){
            return mid;
        }
        else if(arr[mid]>key){
            return binarySearch(arr,key,low,mid-1);
        }
        else{
            return binarySearch(arr,key,mid+1,high);
        }
    }
    else{
        return -1;
    }
}

/**
 * @method 二分查找  loop
 *
 */

function binarySeparate(arr,key){
    var mid,
        low = 0,
        high = arr.length-1;
    while(low <=high){
        mid = parseInt((low+high)/2,10);
        if(arr[mid] === key){
            return mid;
        }
        else if(arr[mid] > key){
            high = mid -1;
        }
        else if(arr[mid] < key){
            low = mid + 1;
        }
        else{
            return -1;
        }
    }
}