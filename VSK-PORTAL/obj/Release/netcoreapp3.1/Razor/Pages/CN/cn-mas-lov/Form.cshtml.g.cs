#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\CN\cn-mas-lov\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "dedfbfe1ba496595f721f049fb45c54d3ab62694"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.CN.cn_mas_lov.Pages_CN_cn_mas_lov_Form), @"mvc.1.0.view", @"/Pages/CN/cn-mas-lov/Form.cshtml")]
namespace MIS_PORTAL.Pages.CN.cn_mas_lov
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dedfbfe1ba496595f721f049fb45c54d3ab62694", @"/Pages/CN/cn-mas-lov/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_CN_cn_mas_lov_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!-- Scroll with content modal -->\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "dedfbfe1ba496595f721f049fb45c54d3ab626944149", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:40%"" > 
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">");
#nullable restore
#line 7 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\CN\cn-mas-lov\Form.cshtml"
                                       Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" Form</h6><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV ID <span class=""tx-danger"">*</span></label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov_id"" name=""lov_id""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1143, "\"", 1157, 0);
                EndWriteAttribute();
                BeginWriteAttribute("required", " required=\"", 1158, "\"", 1169, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">Group LOV <span class=""tx-danger"">*</span></label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov_group"" name=""lov_group""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1714, "\"", 1728, 0);
                EndWriteAttribute();
                BeginWriteAttribute("required", " required=\"", 1729, "\"", 1740, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV TYPE <span class=""tx-danger"">*</span></label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov_type"" name=""lov_type""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2282, "\"", 2296, 0);
                EndWriteAttribute();
                BeginWriteAttribute("required", " required=\"", 2297, "\"", 2308, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">PARENT LOV ID </label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""parent_lov_id"" name=""parent_lov_id""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2833, "\"", 2847, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV CODE <span class=""tx-danger"">*</span></label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov_code"" name=""lov_code""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3389, "\"", 3403, 0);
                EndWriteAttribute();
                BeginWriteAttribute("required", " required=\"", 3404, "\"", 3415, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 1</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov1"" name=""lov1""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3913, "\"", 3927, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 2</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov2"" name=""lov2""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4425, "\"", 4439, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 3</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov3"" name=""lov3""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4937, "\"", 4951, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 4</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov4"" name=""lov4""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5449, "\"", 5463, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 5</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov5"" name=""lov5""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5961, "\"", 5975, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 6</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov6"" name=""lov6""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6473, "\"", 6487, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 7</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov7"" name=""lov7""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6985, "\"", 6999, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 8</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov8"" name=""lov8""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7497, "\"", 7511, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 9</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov9"" name=""lov9""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 8009, "\"", 8023, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV 10</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov10"" name=""lov10""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 8524, "\"", 8538, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV NOTE</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov_desc"" name=""lov_desc""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 9047, "\"", 9061, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group "">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">LOV ORDER</label>
                            </div>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""lov_order"" name=""lov_order""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 9573, "\"", 9587, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                    </div>

                    <div class=""form-group"">
                        <div class=""row"">
                            <div class=""col-md-3"">
                                <label class=""form-label"">ACTIVE FLAG</label>
                            </div>
                            <div class=""col-md-3"">
                                <label class=""rdiobox""><input type=""radio"" class=""active_flag"" name=""rdio"" value=""Y""> <span class=""tx-success"">YES</span></label>
                            </div>
                            <div class=""col-md-3"">
                                <label class=""rdiobox""><input type=""radio"" class=""active_flag"" name=""rdio"" value=""N"" checked> <span class=""tx-danger"">NO</span></label>
                            </div>


                        </div>
                    </div>
                </div>

                <div class=""modal-footer"">
                    <butt");
                WriteLiteral(@"on id=""btn-save_exit"" class=""btn ripple btn-primary btn-save_form"" data-action=""save_exit"" type=""submit"">Save</button>
                    <button id=""btn-save_new"" class=""btn ripple btn-success btn-save_form"" data-action=""save_new"" type=""submit"">Save & New</button>
                    <button class=""btn ripple btn-secondary"" data-dismiss=""modal"" type=""button"">Close</button>
                </div>

            </div>
        </div>
    </div>

    <!--End Scroll with content modal -->
");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
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
