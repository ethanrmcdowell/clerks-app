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
      permitNum: data.permitNum,
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
    console.log("DATA", data);
  }

  addGarage(data: any) {
    const params = {
      startDate: data.formatStartDate,
      endDate: data.formatEndDate,
      permitNum: data.permitNum,
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
    )
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
}
