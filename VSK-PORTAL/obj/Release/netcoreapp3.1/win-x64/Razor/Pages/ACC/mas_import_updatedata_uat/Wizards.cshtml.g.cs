#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_import_updatedata_uat\Wizards.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "baf1910cba85ff014c048d70d907ef6fe6964320"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_import_updatedata_uat.Pages_ACC_mas_import_updatedata_uat_Wizards), @"mvc.1.0.view", @"/Pages/ACC/mas_import_updatedata_uat/Wizards.cshtml")]
namespace MIS_PORTAL.Pages.ACC.mas_import_updatedata_uat
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"baf1910cba85ff014c048d70d907ef6fe6964320", @"/Pages/ACC/mas_import_updatedata_uat/Wizards.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_import_updatedata_uat_Wizards : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""col-lg-12 col-md-12"" id=""wizards"">
    <div class=""card"">
        <div id=""import"" align=""right"">

        </div>
        <div class=""card-body"">
            <div class=""row"">
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-primary-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon"">
                                    <i class=""icon icon-people""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลทั้งหมด</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_all"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div cl");
            WriteLiteral(@"ass=""col-lg-3 col-md-6"">
                    <div class=""card  bg-danger-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon text-warning"">
                                    <i class=""icon icon-rocket""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลผิดพลาด</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_incomplete"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-success-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex m");
            WriteLiteral(@"d-mb-0"">
                                <div class=""counter-icon text-primary"">
                                    <i class=""icon icon-docs""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลสำเร็จ</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_complete"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-warning-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon text-success"">
                                    <i class=""icon icon-emotsmile""></i>
                                </div>
       ");
            WriteLiteral(@"                         <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลที่ต้องแก้ไข</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_problem"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- row closed -->
            <div id=""wizard1"">
                <h3>รายการข้อมูลทั้งหมด</h3>
                <section>

                    <div class=""row row-sm "">
                        <div class=""col-sm-7 col-md-6 col-lg-4"">
                            <div class=""custom-file"">
                                <input class=""custom-file-input"" id=""customFile"" type=""file""> <label class=""custom-file-label"" for=""customFile"">Choose file</label>
                            </div>
                        </div>
                        <div class=""col-sm-5 col-md-6 col");
            WriteLiteral("-lg-8\">\r\n                            <button type=\"button\" id=\"btn_downloadtemplate\" class=\"col-sm-2 btn btn-sm btn-primary btn-with-icon btn-block\">Download Template</button>\r\n");
            WriteLiteral(@"                        </div>
                    </div>

                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#<br />&nbsp;<br />&nbsp;<br />&nbsp;</th>
                                            <th>Status<br />&nbsp;<br />&nbsp;<br />&nbsp;</th>
                                            <th><div style=""width: 150px;text-align:center;"">รหัสสินค้า<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">ชื่อสินค้า<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                       ");
            WriteLiteral(@"                     <th><div style='width: 90px;text-align:center;'>Car Type<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Usage/Car<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Service Year<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ปริมาณ (ลิตร)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>จำนวน (ชิ้น/ลัง)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ส่วนลดสูงสุด (%)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>กำไรต่ำสุด (%)<br />&nbsp;<br />&nb");
            WriteLiteral(@"sp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ประเภท VAT<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Stock Status<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Remark by PM<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>SKU Focus<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ห้ามซื้อ<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ห้ามขาย<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>");
            WriteLiteral(@"Inactive<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>เฉพาะรับลูกค้า<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Life Cycle Action<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Life Cycle Review Date<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Certification Status<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Supersession Barcode<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Relationship Type<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px");
            WriteLiteral(@";text-align:center;'>Lock Code<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Planing Type<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Source Type<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Manual Safety Stock<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>MOQ<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Lead Time Supplier<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Lead Time Item<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <t");
            WriteLiteral(@"h><div style='width: 90px;text-align:center;'>Minimum Qty<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Maximum Qty<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Purchase<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Purchase Condition<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Prefer Supplier Code<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 150px;text-align:center;'>Prefer Supplier Name<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Prefer Supplier Discount<br />&nbsp;</div></th>
                  ");
            WriteLiteral(@"                          <th><div style='width: 90px;text-align:center;'>Discount Group<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Purchase Discount Group<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Sales Discount Group<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Transfer Unit<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Minimum QTY Warehouse<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Maximum QTY Warehouse<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Part Number<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                ");
            WriteLiteral(@"                            <th><div style='width: 90px;text-align:center;'>OEM Number<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Other Information<br />ส่วนขยายอื่นๆ<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Maker<br />ยี่ห้อรถ<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Model<br />รุ่นรถ<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Model Year Change<br />ปีเปลี่ยนโฉม<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Engine Code<br />หมายเลขเครื่อง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Chassis No.<br />เลขตัวถัง<br ");
            WriteLiteral(@"/>&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CC Engine<br />ขนาดเครื่องยนต์<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Parts Link<br />เบอร์พ่วง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Body Code<br />รหัสตัวถัง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Year Start<br />ปีรถเริ่มต้น<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Year End<br />ปีรถสิ้นสุด<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 200px;text-align:center;'>Remarks<br />คำอธิบายลักษณะการใช้งาน<br />&nbsp;<br />&nbsp;</div></th>
                                        </thead>
 ");
            WriteLiteral(@"                                   <tbody id=""tbl-list-temp-tbody"">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <h3>รายการที่สามารนำเข้าได้</h3>
                <section>
                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#<br />&nbsp;<br />&nbsp;<br />&nbsp;</th>
                                            <th>Status<br />&nbsp;<br />&nbsp;<br />&nbsp;</th>
                             ");
            WriteLiteral(@"               <th><div style=""width: 150px;text-align:center;"">รหัสสินค้า<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">ชื่อสินค้า<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Type<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Usage/Car<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Service Year<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ปริมาณ (ลิตร)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>จำนวน (ชิ้น/ลัง)<br />&nbsp;<br />&nbsp;<br />&nbsp");
            WriteLiteral(@";</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ส่วนลดสูงสุด (%)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>กำไรต่ำสุด (%)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ประเภท VAT<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Stock Status<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Remark by PM<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>SKU Focus<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'");
            WriteLiteral(@">ห้ามซื้อ<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ห้ามขาย<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Inactive<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>เฉพาะรับลูกค้า<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Life Cycle Action<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Life Cycle Review Date<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Certification Status<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 9");
            WriteLiteral(@"0px;text-align:center;'>Supersession Barcode<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Relationship Type<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Lock Code<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Planing Type<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Source Type<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Manual Safety Stock<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>MOQ<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><d");
            WriteLiteral(@"iv style='width: 90px;text-align:center;'>Lead Time Supplier<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Lead Time Item<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Minimum Qty<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Maximum Qty<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Purchase<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Purchase Condition<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Prefer Supplier Code<br />&nbsp;<br />&nbsp;</div></th>
                       ");
            WriteLiteral(@"                     <th><div style='width: 150px;text-align:center;'>Prefer Supplier Name<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Prefer Supplier Discount<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Discount Group<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Purchase Discount Group<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Sales Discount Group<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Transfer Unit<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Minimum QTY Warehouse<br />&nbsp;<br />&nbsp;</div></th>
                    ");
            WriteLiteral(@"                        <th><div style='width: 90px;text-align:center;'>Maximum QTY Warehouse<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Part Number<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>OEM Number<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Other Information<br />ส่วนขยายอื่นๆ<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Maker<br />ยี่ห้อรถ<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Model<br />รุ่นรถ<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Model Year Change<br />ปีเปลี่ยนโฉม<br />&nb");
            WriteLiteral(@"sp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Engine Code<br />หมายเลขเครื่อง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Chassis No.<br />เลขตัวถัง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CC Engine<br />ขนาดเครื่องยนต์<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Parts Link<br />เบอร์พ่วง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Body Code<br />รหัสตัวถัง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Year Start<br />ปีรถเริ่มต้น<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-");
            WriteLiteral(@"align:center;'>Car Year End<br />ปีรถสิ้นสุด<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 200px;text-align:center;'>Remarks<br />คำอธิบายลักษณะการใช้งาน<br />&nbsp;<br />&nbsp;</div></th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <h3>รายการที่นำเข้าสำเร็จแล้ว</h3>
                <section>
                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <t");
            WriteLiteral(@"head>
                                        <tr>
                                            <th>#<br />&nbsp;<br />&nbsp;<br />&nbsp;</th>
                                            <th>Status<br />&nbsp;<br />&nbsp;<br />&nbsp;</th>
                                            <th><div style=""width: 150px;text-align:center;"">รหัสสินค้า<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">ชื่อสินค้า<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Type<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Usage/Car<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Service Year<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                          ");
            WriteLiteral(@"                  <th><div style='width: 90px;text-align:center;'>ปริมาณ (ลิตร)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>จำนวน (ชิ้น/ลัง)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ส่วนลดสูงสุด (%)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>กำไรต่ำสุด (%)<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ประเภท VAT<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Stock Status<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Remark by PM<br />&nbsp;<br />&");
            WriteLiteral(@"nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>SKU Focus<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ห้ามซื้อ<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>ห้ามขาย<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Inactive<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>เฉพาะรับลูกค้า<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Life Cycle Action<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Life ");
            WriteLiteral(@"Cycle Review Date<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Certification Status<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Supersession Barcode<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Relationship Type<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Lock Code<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Planing Type<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Source Type<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px");
            WriteLiteral(@";text-align:center;'>Manual Safety Stock<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>MOQ<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Lead Time Supplier<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Lead Time Item<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Minimum Qty<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Maximum Qty<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Purchase<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th>");
            WriteLiteral(@"<div style='width: 90px;text-align:center;'>Purchase Condition<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Prefer Supplier Code<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 150px;text-align:center;'>Prefer Supplier Name<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Prefer Supplier Discount<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Discount Group<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Purchase Discount Group<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Sales Discount Group<br />&nbsp;</div></th>
                                            <th><div ");
            WriteLiteral(@"style='width: 90px;text-align:center;'>Transfer Unit<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Minimum QTY Warehouse<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Maximum QTY Warehouse<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Part Number<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>OEM Number<br />&nbsp;<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Other Information<br />ส่วนขยายอื่นๆ<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Maker<br />ยี่ห้อรถ<br />&nbsp;<br />&nbsp;</div></th>
               ");
            WriteLiteral(@"                             <th><div style='width: 90px;text-align:center;'>Car Model<br />รุ่นรถ<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Model Year Change<br />ปีเปลี่ยนโฉม<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Engine Code<br />หมายเลขเครื่อง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Chassis No.<br />เลขตัวถัง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CC Engine<br />ขนาดเครื่องยนต์<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Parts Link<br />เบอร์พ่วง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Body Code<br />รห");
            WriteLiteral(@"ัสตัวถัง<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Year Start<br />ปีรถเริ่มต้น<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>Car Year End<br />ปีรถสิ้นสุด<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 200px;text-align:center;'>Remarks<br />คำอธิบายลักษณะการใช้งาน<br />&nbsp;<br />&nbsp;</div></th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
        <div class=""border-top my-3""></div>
        <div class=""table-responsive mg-t-20"">
            <table id=""tbl-list"" class=""table table-bordered table-strip");
            WriteLiteral("ed table-hover mg-b-0 text-md-nowrap\"></table>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591