#!/bin/bash

N=$1

rand()
{
    expr $RANDOM % $N
}

echo digraph G {

for ((i=1; i<=$2; i+=1)); do
    R1=$(rand)
    R2=$(rand)
    if [ "$R1" != "$R2" ]; then
        echo $R1' -> '$R2
    fi
done | sort |uniq

echo } 
