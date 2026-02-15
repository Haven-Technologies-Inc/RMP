import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';

export enum TenoviShippingStatus {
  DRAFT = 'DR',
  REQUESTED = 'RQ',
  PENDING = 'PE',
  CREATED = 'CR',
  ON_HOLD = 'OH',
  READY_TO_SHIP = 'RS',
  SHIPPED = 'SH',
  DELIVERED = 'DE',
  RETURNED = 'RE',
  CANCELLED = 'CA',
}

export enum TenoviDeviceStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  UNLINKED = 'unlinked',
}

@Entity('tenovi_hwi_devices')
@Index(['hwiDeviceId'], { unique: true })
@Index(['patientId'])
@Index(['organizationId'])
@Index(['hardwareUuid'])
export class TenoviHwiDevice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'hwi_device_id', unique: true })
  hwiDeviceId: string;

  @Column({ name: 'tenovi_id', nullable: true })
  tenoviId: string;

  @Column({
    type: 'enum',
    enum: TenoviDeviceStatus,
    default: TenoviDeviceStatus.INACTIVE,
  })
  status: TenoviDeviceStatus;

  @Column({ name: 'connected_on', type: 'timestamp', nullable: true })
  connectedOn: Date;

  @Column({ name: 'unlinked_on', type: 'timestamp', nullable: true })
  unlinkedOn: Date;

  @Column({ name: 'last_measurement', type: 'timestamp', nullable: true })
  lastMeasurement: Date;

  // Device details
  @Column({ name: 'device_name', nullable: true })
  deviceName: string;

  @Column({ name: 'hardware_uuid', nullable: true })
  hardwareUuid: string;

  @Column({ name: 'sensor_code', nullable: true })
  sensorCode: string;

  @Column({ name: 'sensor_id', nullable: true })
  sensorId: string;

  @Column({ name: 'device_type_id', nullable: true })
  deviceTypeId: string;

  @Column({ name: 'model_number', nullable: true })
  modelNumber: string;

  @Column({ name: 'shared_hardware_uuid', default: false })
  sharedHardwareUuid: boolean;

  // Fulfillment details
  @Column({ name: 'fulfillment_created', type: 'timestamp', nullable: true })
  fulfillmentCreated: Date;

  @Column({
    name: 'shipping_status',
    type: 'enum',
    enum: TenoviShippingStatus,
    nullable: true,
  })
  shippingStatus: TenoviShippingStatus;

  @Column({ name: 'shipping_name', nullable: true })
  shippingName: string;

  @Column({ name: 'shipping_address', nullable: true })
  shippingAddress: string;

  @Column({ name: 'shipping_city', nullable: true })
  shippingCity: string;

  @Column({ name: 'shipping_state', nullable: true })
  shippingState: string;

  @Column({ name: 'shipping_zip_code', nullable: true })
  shippingZipCode: string;

  @Column({ name: 'shipping_tracking_link', nullable: true })
  shippingTrackingLink: string;

  @Column({ name: 'shipped_on', type: 'timestamp', nullable: true })
  shippedOn: Date;

  @Column({ name: 'delivered_on', type: 'timestamp', nullable: true })
  deliveredOn: Date;

  @Column({ name: 'fulfilled', default: false })
  fulfilled: boolean;

  // Patient assignment
  @Column({ name: 'tenovi_patient_id', nullable: true })
  tenoviPatientId: string;

  @Column({ name: 'patient_phone_number', nullable: true })
  patientPhoneNumber: string;

  @Column({ nullable: true })
  patientId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'patientId' })
  patient: User;

  // Organization
  @Column({ nullable: true })
  organizationId: string;

  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  // Tenovi patient data (denormalized for quick access)
  @Column({ name: 'patient_external_id', nullable: true })
  patientExternalId: string;

  @Column({ name: 'patient_name', nullable: true })
  patientName: string;

  @Column({ name: 'patient_email', nullable: true })
  patientEmail: string;

  @Column({ name: 'physician', nullable: true })
  physician: string;

  @Column({ name: 'clinic_name', nullable: true })
  clinicName: string;

  @Column({ name: 'care_manager', nullable: true })
  careManager: string;

  @Column({ name: 'sms_opt_in', default: false })
  smsOptIn: boolean;

  // Metadata
  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true, name: 'fulfillment_metadata' })
  fulfillmentMetadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
