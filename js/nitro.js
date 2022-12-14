
let modalKey = 0

let quantPecas = 1

let cart = [] 

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.pecaWindowArea').style.opacity = 0 
    seleciona('.pecaWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.pecaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.pecaWindowArea').style.opacity = 0 
    setTimeout(() => seleciona('.pecaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    selecionaTodos('.pecaInfo--cancelButton, .pecaInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDasPecas = (pecaItem, item, index) => {
   
	pecaItem.setAttribute('data-key', index)
    pecaItem.querySelector('.peca-item--img img').src = item.img
    pecaItem.querySelector('.peca-item--price').innerHTML = formatoReal(item.price[2])
    pecaItem.querySelector('.peca-item--name').innerHTML = item.name
    pecaItem.querySelector('.peca-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.pecaBig img').src = item.img
    seleciona('.pecaInfo h1').innerHTML = item.name
    seleciona('.pecaInfo--desc').innerHTML = item.description
    seleciona('.pecaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}


const pegarKey = (e) => {
   
    let key = e.target.closest('.peca-item').getAttribute('data-key')
    console.log('Peca clicada ' + key)
    console.log(pecaJson5[key])

    quantPecas = 1

    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    seleciona('.pecaInfo--size.selected').classList.remove('selected')

    selecionaTodos('.pecaInfo--size').forEach((size, sizeIndex) => {
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = pecaJson5[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
   
    selecionaTodos('.pecaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
           
            seleciona('.pecaInfo--size.selected').classList.remove('selected')
           
            size.classList.add('selected')

            seleciona('.pecaInfo--actualPrice').innerHTML = formatoReal(pecaJson5[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    seleciona('.pecaInfo--qtmais').addEventListener('click', () => {
        quantPecas++
        seleciona('.pecaInfo--qt').innerHTML = quantPecas
    })

    seleciona('.pecaInfo--qtmenos').addEventListener('click', () => {
        if(quantPecas > 1) {
            quantPecas--
            seleciona('.pecaInfo--qt').innerHTML = quantPecas	
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.pecaInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

       
    	console.log("Peca " + modalKey)
	    let size = seleciona('.pecaInfo--size.selected').getAttribute('data-key')
	    console.log("  " + size)
    	console.log("Quant. " + quantPecas)
        let price = seleciona('.pecaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
       
	    let identificador = pecaJson5[modalKey].id+'t'+size

       
        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
        
            cart[key].qt += quantPecas
        } else {
          
            let peca = {
                identificador,
                id: pecaJson5[modalKey].id,
                size, 
                qt: quantPecas,
                price: parseFloat(price) 
            }
            cart.push(peca)
            console.log(peca)
            console.log('Sub total R$ ' + (peca.qt * peca.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' 
    }

  
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
  
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' 
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    
	seleciona('.menu-openner span').innerHTML = cart.length
	

	if(cart.length > 0) {

	
		seleciona('aside').classList.add('show')

		
		seleciona('.cart').innerHTML = ''

    
		let subtotal = 0
		let desconto = 0
		let total    = 0

      
		for(let i in cart) {
		
			let pecaItem = pecaJson5.find( (item) => item.id == cart[i].id )
			console.log(pecaItem)

       
        	subtotal += cart[i].price * cart[i].qt
       
		
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let pecaSizeName = cart[i].size

			let pecaName = `${pecaItem.name} (${pecaSizeName})`

		
			cartItem.querySelector('img').src = pecaItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = pecaName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

		
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
			
				cart[i].qt++
			
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
			
					cart[i].qt--
				} else {
			
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

	
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} 
		desconto = subtotal * 0
		total = subtotal - desconto

	
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}


pecaJson5.map((item, index ) => {
  
    let pecaItem = document.querySelector('.models .peca-item').cloneNode(true)
   
    seleciona('.peca-area').append(pecaItem)

   
    preencheDadosDasPecas(pecaItem, item, index)
    
   
    pecaItem.querySelector('.peca-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na peca')

      
        let chave = pegarKey(e)

        abrirModal()

        preencheDadosModal(item)

        preencherTamanhos(chave)

		seleciona('.pecaInfo--qt').innerHTML = quantPecas

        escolherTamanhoPreco(chave)

    })

    botoesFechar()

}) 


mudarQuantidade()

adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()





