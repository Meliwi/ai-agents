# ai-agents

## Integrantes: 
### Michelle González Hernández - 1871074
### Melissa González Nebrijo - 1832127


First attemp to create a multi agent framework for the lecture: Introducción a la inteligencia Artificial. 

## Install

``` bash
git clone https://github.com/andcastillo/ai-agents.git
cd ai-agents
npm install 
```

## Run the example

node src/example/main.js

## Output

```
Winner Smith
[ { agentID: 'Smith', action: 'DOWN' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' } ]
[ [ 0, 0, 0, 0 ],
  [ 0, 1, 1, -1 ],
  [ 0, 1, 0, 0 ],
  [ 0, 'X', 0, 1 ] ]
```
  
  As we still having the -1 in the problem matrix, we assume that agent could not solve the given problem.
  
  Now, try it yoursel!!!!
