import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  // GARAGE SALE API ENDPOINTS
  searchGarage(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
      permitNo: data.permitNum.trim(),
      name: data.name,
      address: data.address,
      section: data.section,
      orgName: data.orgName,
      orgAddress: data.orgAddress
    }

    return this.http.get(
      'http://localhost:3000/api/garage/search', { params }
    );
  }

  reportGarage(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
    }

    console.log("PARAMS", params);

    return this.http.get(
      'http://localhost:3000/api/garage/report', { params }
    );
  }

  updateGarage(data: any) {
    const params = {
      startDate: data.sale_date,
      endDate: data.end_date,
      permitNo: data.permit_no.trim(),
      name: data.name,
      address: data.street_addr,
      zip: data.zip,
      telephone: data.phone,
      section: data.section,
      orgName: data.org_name,
      orgAddress: data.org_addr,
      orgTelephone: data.org_phone,
      notes: data.notes
    }

    return this.http.get(
      'http://localhost:3000/api/garage/edit', { params }
    );
  }

  addGarage(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
      permitNo: data.permitNum.trim(),
      name: data.name,
      address: data.address,
      zip: data.zip,
      telephone: data.telephone,
      section: data.section,
      orgName: data.orgName,
      orgAddress: data.orgAddress,
      orgTelephone: data.orgTelephone,
      notes: data.notes,
      timestamp: data.timestamp
    }

    return this.http.get(
      'http://localhost:3000/api/garage/add', { params }
    );
  }

  deleteGarage(data: any) {
    const params = {
      permitNo: data.permit_no.trim(),
    }

    return this.http.get(
      'http://localhost:3000/api/garage/delete', { params }
    );
  }

  // MEETING API ENDPOINTS
  searchMeetings(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
      keyword1: data.keyword1,
      keyword2: data.keyword2,
      idNumber: data.idNumber
    }

    return this.http.get(
      'http://localhost:3000/api/meeting/search', { params }
    );
  }

  addMeetings(data: any) {
    const params = {
      meetingDate: data.formatDate,
      reference: data.reference,
      subReference: data.subReference,
      description: data.description,
      timestamp: data.timestamp
    }

    return this.http.get(
      'http://localhost:3000/api/meeting/add', { params }
    );
  }

  editMeetings(data: any) {
    const params = {
      meetingDate: data.entry_date,
      reference: data.reference,
      subReference: data.sub_ref1,
      description: data.description,
      idNo: data.idno
    }

    return this.http.get(
      'http://localhost:3000/api/meeting/edit', { params }
    );
  }

  deleteMeetings(data: any) {
    const params = {
      idNo: data.idno,
    }

    return this.http.get(
      'http://localhost:3000/api/meeting/delete', { params }
    );
  }

  // DEED API ENDPOINTS
  searchDeeds(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
      sidwell: data.sidwell,
      liber: data.liber,
      pageStart: data.pageStart,
      pageEnd: data.pageEnd,
      grantor: data.grantor,
      description: data.description
    }

    return this.http.get(
      'http://localhost:3000/api/deed/search', { params }
    );
  }

  addDeeds(data: any) {
    const params = {
      docDate: data.docDateFormat,
      recDate: data.recDateFormat,
      sidwell: data.sidwell,
      liber: data.liber,
      grantee: data.grantee,
      grantor: data.grantor,
      pageNo: data.pageNo,
      section: data.section,
      use: data.use,
      docType: data.docType,
      propDescription: data.propDescription,
      textDescription: data.textDescription
    }

    return this.http.get(
      'http://localhost:3000/api/deed/add', { params }
    );
  }

  editDeeds(data: any) {
    const params = {
      docDate: data.doc_date,
      recDate: data.rec_date,
      sidwell: data.sidwell,
      liber: data.liber,
      grantee: data.grantee,
      grantor: data.grantor,
      pageNo: data.page_no,
      section: data.section,
      use: data.use,
      docType: data.doc_type,
      propDescription: data.propdesc,
      textDescription: data.text_desc,
      idNo: data.idno
    }

    return this.http.get(
      'http://localhost:3000/api/deed/edit', { params }
    );
  }

  deleteDeed(data: any) {
    const params = {
      idNo: data.idno,
    }

    return this.http.get(
      'http://localhost:3000/api/deed/delete', { params }
    );
  }
}
