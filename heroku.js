window.onload = function() {  

  	var tags = document.body.getElementsByTagName("*"), buff=[];
    for(var i=0, mx=tags.length; i<mx;i++){
         var it = tags[i];         
         buff[i] =  it.nodeName+" : "+ (it.id);
         findAndReplace('{{app-name}}',appName,it);
    }
};  

function findAndReplace(searchText, replacement, searchNode) {
    if (!searchText || typeof replacement === 'undefined') {
        // Throw error here if you want...
        return;
    }
    var regex = typeof searchText === 'string' ?
                new RegExp(searchText, 'g') : searchText,
        childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'html,head,style,title,link,meta,script,object,iframe';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(searchText, replacement, currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data.replace(regex, replacement),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}