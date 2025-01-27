import Roles from '#enums/roles'
import Cottage from '#models/cottage'
import Role from '#models/role'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: Roles.MEMBER,
        name: 'Member',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])

    await User.create({
      fullname: 'John Doe',
      email: 'johndoe@email.io',
      password: 'motdepasse',
    })

    await Cottage.createMany([
      {
        id: 1,
        name: '001',
        maxCapacity: 2,
        regularPrice: 250,
        description: 'A cozy cabin for two',
        imageUrl: 'cabin-001.jpg',
      },
      {
        id: 2,
        name: '002',
        maxCapacity: 2,
        regularPrice: 350,
        discount: 25,
        description: 'A spacious cabin for two',
        imageUrl: 'cabin-002.jpg',
      },
      {
        id: 3,
        name: '003',
        maxCapacity: 4,
        regularPrice: 500,
        discount: 50,
        description: 'A cabin for a family of four',
        imageUrl: 'cabin-003.jpg',
      },
      {
        id: 4,
        name: '004',
        maxCapacity: 4,
        regularPrice: 750,
        description: 'A cabin for a group of four',
        imageUrl: 'cabin-004.jpg',
      },
      {
        id: 5,
        name: '005',
        maxCapacity: 6,
        regularPrice: 1000,
        discount: 100,
        description: 'A cabin for a group of six',
        imageUrl: 'cabin-005.jpg',
      },
      {
        id: 6,
        name: '006',
        maxCapacity: 6,
        regularPrice: 1500,
        description: 'A cabin for a group of six',
        imageUrl: 'cabin-006.jpg',
      },
      {
        id: 7,
        name: '007',
        maxCapacity: 8,
        regularPrice: 2000,
        discount: 200,
        description: 'A cabin for a group of eight',
        imageUrl: 'cabin-007.jpg',
      },
      {
        id: 8,
        name: '008',
        maxCapacity: 10,
        regularPrice: 2500,
        description: 'A cabin for a group of ten',
        imageUrl: 'cabin-008.jpg',
      },
    ])
  }
}
