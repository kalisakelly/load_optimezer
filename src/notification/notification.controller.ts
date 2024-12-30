import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@ApiTags('Notifications') // Group this controller under 'Notifications' in Swagger
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' }) // Describe the endpoint
  @ApiBody({ type: CreateNotificationDto }) // Add schema for request body
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' }) // Describe the endpoint
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notification by ID' }) // Describe the endpoint
  @ApiParam({ name: 'id', description: 'ID of the notification to retrieve' }) // Document the 'id' parameter
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification by ID' }) // Describe the endpoint
  @ApiParam({ name: 'id', description: 'ID of the notification to update' }) // Document the 'id' parameter
  @ApiBody({ type: UpdateNotificationDto }) // Add schema for request body
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification by ID' }) // Describe the endpoint
  @ApiParam({ name: 'id', description: 'ID of the notification to delete' }) // Document the 'id' parameter
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
