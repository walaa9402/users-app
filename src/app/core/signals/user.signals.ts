import { signal, computed } from '@angular/core';
import { User } from '../../models/user.model';

export const userSignal = signal<User[]>([]);
export const userCountSignal = computed(() => userSignal().length);
