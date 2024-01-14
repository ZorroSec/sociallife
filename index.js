import express from 'express'
import { Sequelize } from 'sequelize'
import { createConnection } from 'mysql2'
import connection from './connections/database.js'