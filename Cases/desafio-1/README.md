# Desafio 1

## Implementada uma função GET que retorna o valor do objeto com base no caminho informado.
#### path (Caminho)
#### data (Objeto)

```javascript
// funcao GET

get(path, data);

```


#### **Exemplo**

```javascript
//GET

get('a.b.d[1].e', { a: { b: { c: 1, d: [1, { e: 2 }] } } });

```

#### **Exemplos de resposta**

```javascript
// Caminho válido retorna (no console.log())
    2
```

```javascript
// Caminho inválido retorna (no console.log())
    undefined
```

```javascript
// Se o caminho não for informado, retorna o objeto (no console.log())
    { a: { b: { c: 1, d: [1, { e: 2 }] } } }
```


