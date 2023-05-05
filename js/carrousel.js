(function(){
   //console.log('Début du carrousel')
   let carrousel__ouvrir = document.querySelector('.carrousel__ouvrir')
   let carrousel = document.querySelector('.carrousel')
   let carrousel__x = document.querySelector('.carrousel__x')
   let carrousel__figure = document.querySelector('.carrousel__figure')
   let carrousel__form = document.querySelector('.carrousel__form')
   let carrousel__gauche = document.querySelector('.carrousel__gauche')
   let carrousel__droite = document.querySelector('.carrousel__droite')
   //console.log(carrousel__form.tagName) //conteneur de radio-boutons

   let galerie = document.querySelector('.galerie', )
   let galerie__img = galerie.querySelectorAll('img')

   carrousel__gauche.addEventListener('mousedown', function(){
      index--
      if(index == -1){
         index = galerie__img.length-1
      }
      affiche_image_carrousel()
   })

   carrousel__droite.addEventListener('mousedown', function(){
      index++
      if(index == galerie__img.length){
        index = 0
      }
      affiche_image_carrousel()
   })

   carrousel__x.addEventListener('mousedown', function(){
      carrousel.classList.remove('carrousel--activer')
   })

/**
 * Pour chaque image de la galerie l'ajouter dans le carrousel
 */
let position = 0
let index = 0
let ancienIndex = -1

   for (const elem of galerie__img){

      elem.dataset.index = position

      elem.addEventListener('mousedown',function(e){
         index = e.target.dataset.index
         affiche_image_carrousel()
         if(carrousel.classList.contains('carrousel--activer') == false){
            carrousel.classList.add('carrousel--activer')
         }
    })

      ajouter_une_image_dans_carrousel(elem)
      ajouter_un_radio_bouton_dans_carrousel()
   }


/**
 * Création dynamique d'une image pour le carrousel
 * @param {*} elem une image de la galerie
 */
function ajouter_une_image_dans_carrousel(elem)
{
   let img = document.createElement('img')
   img.classList.add('carrousel__img')
   // -150x150.jpg  si c'est jpg...
   img.src = elem.src.substr(0,elem.src.length-12) + ".jpg"
   // console.log(img.src)
   carrousel__figure.append(img);
}

function ajouter_un_radio_bouton_dans_carrousel(){
   let rad = document.createElement('input')
   rad.setAttribute('type','radio')
   rad.setAttribute('name','carrousel__rad')
   rad.classList.add('carrousel__rad')
   rad.dataset.index = position
   rad.addEventListener('mousedown', function(){
     index =  this.dataset.index
     affiche_image_carrousel()
   })
   position = position + 1 // incrémentation de la position
   carrousel__form.append(rad)
} 

/**
 * Affiche la nouvelle image du carrouel
 */
function affiche_image_carrousel(){
   if(ancienIndex != -1){
      carrousel__figure.children[ancienIndex].style.opacity = "0"
      carrousel__form.children[ancienIndex].checked=false
      //carrousel__figure.children[ancienIndex].classList.remove('carrousel__img--activer');
   }
   //console.log(this.dataset.index)
   redimensionner_carrousel()
   carrousel__figure.children[index].style.opacity = "1"
   carrousel__form.children[index].checked=true
   //carrousel__figure.children[index].classList.add('carrousel__img--activer');
   ancienIndex = index
}

function redimensionner_carrousel(){
   const windowWidth = window.innerWidth
   const windowHeight = window.innerHeight
   const imageWidth = carrousel__figure.children[index].naturalWidth
   const imageHeight = carrousel__figure.children[index].naturalHeight
   let carrouselWidth = carrousel.offsetWidth
   let carrouselHeight = carrousel.offsetHeight

   // pour fenêtre inférieur à 1000px de large
   carrouselWidth=windowWidth
   if(windowWidth>1000){
      carrouselWidth = windowWidth - windowHeight/2
   }
   carrouselWidth = windowWidth - windowHeight/2
   carrouselHeight = carrouselWidth * imageHeight/imageWidth

   carrousel.style.width = `${carrouselWidth}px`
   carrousel.style.height = `${carrouselHeight}px`

   carrousel.style.left = `${(windowWidth - carrouselWidth)/2}px`
   carrousel.style.top = `${(windowHeight - carrouselHeight)/2}px`

   console.log(
      `windowWidth= ${windowWidth}
      windowHeight= ${windowHeight}
      imageWidth= ${imageWidth}
      imageHeight= ${imageHeight}
      carrouselWidth= ${carrouselWidth}
      carrouselHeight= ${carrouselHeight}`
   )
}

})()